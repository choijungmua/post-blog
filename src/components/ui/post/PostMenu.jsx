"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MoreHorizontalIcon,
  ShareIcon,
  BookmarkIcon,
  PrinterIcon,
  LinkIcon,
  TwitterIcon,
  FacebookIcon,
  HeartIcon,
  ThumbsUpIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import { Button } from "@/components/shadcn/button";
import { toast } from "sonner";

/**
 * 포스트 메뉴 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.postSlug - 포스트 슬러그
 * @param {string} props.postTitle - 포스트 제목
 */
export default function PostMenu({ postSlug, postTitle }) {
  const router = useRouter();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  // 현재 페이지 URL 가져오기
  const currentUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/posts/post-detail/${postSlug}`
      : "";

  // 공유 기능
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: postTitle,
          url: currentUrl,
        });
        toast.success("공유 성공!");
      } catch (error) {
        toast.error("공유에 실패했습니다.");
        console.error("공유에 실패했습니다:", error);
      }
    } else {
      // 공유 API를 지원하지 않는 브라우저의 경우 URL 복사
      handleCopyLink();
    }
  };

  // URL 복사 기능
  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => toast.success("링크가 복사되었습니다."))
      .catch(() => toast.error("링크 복사에 실패했습니다."));
  };

  // 인쇄 기능
  const handlePrint = () => {
    window.print();
  };

  // 소셜 미디어 공유
  const handleSocialShare = (platform) => {
    let shareUrl = "";

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          postTitle
        )}&url=${encodeURIComponent(currentUrl)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          currentUrl
        )}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  // 좋아요 기능
  const handleLike = () => {
    setLiked(!liked);
    toast.success(liked ? "좋아요를 취소했습니다." : "좋아요를 눌렀습니다.");
    // 실제 API 호출은 여기에 추가
  };

  // 북마크 기능
  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    toast.success(
      bookmarked ? "북마크가 취소되었습니다." : "북마크에 추가되었습니다."
    );
    // 실제 API 호출은 여기에 추가
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={liked ? "default" : "outline"}
        size="icon"
        onClick={handleLike}
        aria-label="좋아요"
        className="h-9 w-9"
      >
        <ThumbsUpIcon className="h-4 w-4" />
      </Button>

      <Button
        variant={bookmarked ? "default" : "outline"}
        size="icon"
        onClick={handleBookmark}
        aria-label="북마크"
        className="h-9 w-9"
      >
        <BookmarkIcon className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={handleShare}
        aria-label="공유하기"
        className="h-9 w-9"
      >
        <ShareIcon className="h-4 w-4" />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            aria-label="더 보기"
            className="h-9 w-9"
          >
            <MoreHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleCopyLink}>
            <LinkIcon className="mr-2 h-4 w-4" />
            <span>링크 복사</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handlePrint}>
            <PrinterIcon className="mr-2 h-4 w-4" />
            <span>인쇄하기</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleSocialShare("twitter")}>
            <TwitterIcon className="mr-2 h-4 w-4" />
            <span>Twitter에 공유</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSocialShare("facebook")}>
            <FacebookIcon className="mr-2 h-4 w-4" />
            <span>Facebook에 공유</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
