import { useQuery } from "@tanstack/react-query";
import { ConfigProvider, Flex, Image, message, Modal } from "antd";
import apiClient from "../../boot/apiClient";
import type { LeagueBadgeResponse } from "../../types/api";
import { useMemo } from "react";
import { IMG_FALLBACK } from "../../constants";

interface BadgeModalProps {
    leagueId: string | null;
    onClose: () => void;
}

const BadgeModal = ({ leagueId, onClose }: BadgeModalProps) => {
    const { data, error, isLoading } = useQuery({
        enabled: !!leagueId,
        queryKey: ["league-badge", leagueId],
        queryFn: async ({ signal }) => {
            const { data } = await apiClient.get<LeagueBadgeResponse>("/search_all_seasons.php", {
                signal,
                params: { badge: 1, id: leagueId }
            });
            return data;
        }
    });

    if (error) {
        message.error(error.message);
    }

    const imgSrc = useMemo(() => data?.seasons?.at(-1)?.strBadge, [data]);

    return (
        <ConfigProvider
            theme={{
                components: { Modal: { contentBg: "#d9d9d9", headerBg: "inherit" } }
            }}>
            <Modal
                data-testid="badge-modal"
                title="League Badge"
                open={!!leagueId}
                onOk={onClose}
                onCancel={onClose}
                loading={isLoading}>
                <Flex align="center" justify="center">
                    <Image src={imgSrc} preview={false} fallback={IMG_FALLBACK} />
                </Flex>
            </Modal>
        </ConfigProvider>
    );
};

export default BadgeModal;
