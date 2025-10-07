import { useQuery } from "@tanstack/react-query";
import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";
import BadgeModal from ".";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { message } from "antd";

vi.mock("@tanstack/react-query");

const leagueBadgeResponseMock = {
    seasons: [
        {
            strSeason: "2004-2005",
            strBadge:
                "https://r2.thesportsdb.com/images/media/league/badgearchive/lttuvz1724183053.png"
        }
    ]
};

describe("BadgeModal Component Tests", () => {
    const mockOnClose = vi.fn();

    const badgeModalProps = {
        leagueId: "1",
        onClose: mockOnClose
    };

    beforeEach(() => {
        (useQuery as Mock).mockReturnValue({
            data: leagueBadgeResponseMock,
            error: null,
            isLoading: false
        });
    });

    it("should render modal on screen", () => {
        const { getByTestId } = render(<BadgeModal {...badgeModalProps} />);

        expect(getByTestId("badge-modal")).toBeInTheDocument();
    });

    it("should call onClose when modal is dismissed", async () => {
        const user = userEvent.setup();

        const { findByText } = render(<BadgeModal {...badgeModalProps} />);

        const cancelBtn = await findByText("Cancel");
        await user.click(cancelBtn);

        expect(mockOnClose).toHaveBeenCalled();
    });

    it("should handle loading state", () => {
        (useQuery as Mock).mockReturnValue({
            data: undefined,
            error: null,
            isLoading: true
        });

        const { getByTestId } = render(<BadgeModal {...badgeModalProps} />);

        const modal = getByTestId("badge-modal");
        expect(modal.querySelector(".ant-skeleton-active")).toBeInTheDocument();
    });

    it("should handle error state", () => {
        const mockError = new Error("Mock Error");

        (useQuery as Mock).mockReturnValue({
            data: undefined,
            error: mockError,
            isLoading: false
        });

        render(<BadgeModal {...badgeModalProps} />);

        expect(message.error).toHaveBeenCalledWith(mockError.message);
    });
});
