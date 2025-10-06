import { use } from "react";
import { BadgeModalContext } from "../../contexts/BadgeModal";

const useBadgeModal = () => {
    return use(BadgeModalContext);
};

export default useBadgeModal;
