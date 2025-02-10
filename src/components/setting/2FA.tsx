import { useState } from "react";
import { IconAuth2fa, IconShield, IconShieldOff } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";

import { User } from "@/contexts/type.user";
import { useNotification } from "@/contexts/notification.context";
import Server from "@/lib/axios";
import OtpModal from "../ui/otpModal";
import SettingSwitch from "./SettingSwitch";


interface TowFactorAuthInput {
  isOpen: boolean;
  state: "register" | "unregister";
}

export default function TowFactorAuth({ user, onSubmitted }: { user: User, onSubmitted: (towFactorAuth: boolean) => void }) {

  const [isOpen, setIsOpen] = useState<TowFactorAuthInput>({ isOpen: false, state: "register" });
  const [otpError, setOtpError] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const { show } = useNotification();

  const { mutate, isPending } = useMutation({
    mutationKey: ["towFactorAuth"],
    mutationFn: async (value: boolean) => {
      const { data } = await Server.post("/api/auth/2fa", { towFactorAuth: value });

      return { accessToken: data.accessToken, message: data.message, value };
    },
    onSuccess: ({accessToken, message, value}) => {
      show(message, "success");
      setIsOpen({ isOpen: true, state: value ? "register" : "unregister" });
      setAccessToken(accessToken);
    }, 
    onError: (error) => {
      if(!isAxiosError(error)) {
        
        show("Something went wrong", "error");
        return;
      };
      
      show(error.response?.data.message || "Something went wrong", "error");
    }
  });

  const onOtpSubmit = async (otp: string) => {
    try {
      const { data } = await Server.post("/api/auth/2fa/verify", { otp, accessToken });
      show(data.message, "success");
      onSubmitted(data.towFactorAuth);
      setIsOpen({ isOpen: false, state: "register" });
    } catch (error) {
      if(!isAxiosError(error)) {
        setOtpError("Something went wrong");
        show("Something went wrong", "error");
        return;
      };
      setOtpError(error.response?.data.message || "Something went wrong");
      show(error.response?.data.message || "Something went wrong", "error");
    }
  };

  return (
    <>
      <SettingSwitch
        Icon={IconAuth2fa}
        title="Turn on 2-Step Verification"
        switchProps={{
          isSelected: user.towFactorAuth,
          isLading: isPending,
          color: "primary",
          size: "md",
          startContent: <IconShield size={20} />,
          endContent: <IconShieldOff size={20} />,
          onValueChange: (value) => { mutate(value); },
        }}
      />
      <OtpModal
        key={user.userId}
        isOpen={isOpen.isOpen}
        setIsOpen={() => { setIsOpen({...isOpen, isOpen: false}); }}
        onSubmit={(otp: string) => { onOtpSubmit(otp); }}
        isError={otpError !== null}
        errorMessage={otpError || ""}
        resendOtp={() => {
          // if
        }}
      />
    </>
  );
}
