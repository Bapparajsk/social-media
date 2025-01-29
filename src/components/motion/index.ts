"use client";

import { motion, AnimatePresence, useSpring, useMotionValue, MotionValue } from "motion/react";

const MotionDiv = motion.create("div");
const MotionP = motion.create("p");

export {
    AnimatePresence, useSpring, useMotionValue, MotionValue,
    MotionDiv, MotionP
};
