export const refactorDate = (createAt: Date): string => {
    const date = new Date(createAt);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime(); // Difference in milliseconds
    const diffMinutes = Math.floor(diffMs / 60000); // Convert to minutes
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays < 1) {
        if (diffHours >= 1) {
            return `${diffHours} hours ago`;
        }
        return `${diffMinutes} minutes ago`;
    }

    return date.toDateString();
};