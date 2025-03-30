"use client";

import Link from "next/link";
import { Button } from "@/components/shadcn/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/shadcn/card";
import { Input } from "@/components/shadcn/input";
import { Label } from "@/components/shadcn/label";
import { Checkbox } from "@/components/shadcn/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/shadcn/radio-group";
import { Textarea } from "@/components/shadcn/textarea";
import { Switch } from "@/components/shadcn/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/shadcn/select";
import { useState } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/shadcn/sonner";

export default function FormExamples() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    subscribe: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("폼이 제출되었습니다.", {
      description: "입력하신 정보가 성공적으로 전송되었습니다.",
    });
    console.log(formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="container mx-auto py-12 space-y-12">
      <Toaster />

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">폼 컴포넌트 예제</h1>
        <div className="space-x-2">
          <Link href="/components-showcase">
            <Button variant="outline">컴포넌트 쇼케이스</Button>
          </Link>
          <Link href="/">
            <Button variant="outline">홈으로 돌아가기</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 기본 연락처 폼 */}
        <Card>
          <CardHeader>
            <CardTitle>연락처 폼</CardTitle>
            <CardDescription>
              기본 입력 필드와 버튼으로 구성된 연락처 폼입니다.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">이름</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="이름을 입력하세요"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="이메일을 입력하세요"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">메시지</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="메시지를 입력하세요"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="subscribe"
                  name="subscribe"
                  checked={formData.subscribe}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      subscribe: checked === true,
                    }))
                  }
                />
                <Label htmlFor="subscribe">뉴스레터 구독</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit">제출하기</Button>
            </CardFooter>
          </form>
        </Card>

        {/* 회원가입 폼 */}
        <Card>
          <CardHeader>
            <CardTitle>회원가입</CardTitle>
            <CardDescription>
              회원가입을 위한 폼 컴포넌트 예제입니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">이름</Label>
                  <Input id="firstName" placeholder="이름" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">성</Label>
                  <Input id="lastName" placeholder="성" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">사용자명</Label>
                <Input id="username" placeholder="사용자명" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">이메일</Label>
                <Input id="signup-email" type="email" placeholder="이메일" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <Input id="password" type="password" placeholder="비밀번호" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="비밀번호 확인"
                />
              </div>
              <div className="space-y-2">
                <Label>성별</Label>
                <RadioGroup defaultValue="male">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">남성</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">여성</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">기타</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">국가</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="국가 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kr">대한민국</SelectItem>
                    <SelectItem value="us">미국</SelectItem>
                    <SelectItem value="jp">일본</SelectItem>
                    <SelectItem value="cn">중국</SelectItem>
                    <SelectItem value="other">기타</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms">
                  <span>
                    <a href="#" className="text-primary hover:underline">
                      이용약관
                    </a>
                    에 동의합니다
                  </span>
                </Label>
              </div>
              <Button
                className="w-full"
                onClick={(e) => {
                  e.preventDefault();
                  toast.success("회원가입이 완료되었습니다.");
                }}
              >
                회원가입
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* 설정 폼 */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>계정 설정</CardTitle>
            <CardDescription>
              계정 설정을 관리할 수 있는 폼 컴포넌트 예제입니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-lg font-medium">개인정보</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="profile-name">이름</Label>
                    <Input id="profile-name" defaultValue="홍길동" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profile-email">이메일</Label>
                    <Input
                      id="profile-email"
                      type="email"
                      defaultValue="hong@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profile-bio">자기소개</Label>
                    <Textarea
                      id="profile-bio"
                      placeholder="자기소개를 입력하세요"
                      defaultValue="Next.js와 React를 활용한 웹 개발을 주로 하는 프론트엔드 개발자입니다."
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-medium">알림 설정</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">이메일 알림</Label>
                      <p className="text-sm text-muted-foreground">
                        중요 업데이트 및 알림을 이메일로 받습니다.
                      </p>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="marketing-emails">마케팅 이메일</Label>
                      <p className="text-sm text-muted-foreground">
                        제품 및 서비스 관련 마케팅 이메일을 받습니다.
                      </p>
                    </div>
                    <Switch id="marketing-emails" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="social-notifications">소셜 알림</Label>
                      <p className="text-sm text-muted-foreground">
                        팔로우 및 댓글 알림을 받습니다.
                      </p>
                    </div>
                    <Switch id="social-notifications" defaultChecked />
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <h3 className="text-lg font-medium">보안</h3>
                  <div className="space-y-2">
                    <Label htmlFor="current-password">현재 비밀번호</Label>
                    <Input
                      id="current-password"
                      type="password"
                      placeholder="현재 비밀번호"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">새 비밀번호</Label>
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="새 비밀번호"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-new-password">
                      새 비밀번호 확인
                    </Label>
                    <Input
                      id="confirm-new-password"
                      type="password"
                      placeholder="새 비밀번호 확인"
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline">취소</Button>
            <Button onClick={() => toast.success("설정이 저장되었습니다.")}>
              저장
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="text-center">
        <p className="text-muted-foreground mb-4">
          이 페이지는 shadcn/ui 폼 관련 컴포넌트를 활용하여 구현되었습니다. 더
          많은 컴포넌트를 확인하려면{" "}
          <a
            href="https://ui.shadcn.com/docs/components/form"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-4"
          >
            shadcn/ui 폼 컴포넌트 문서
          </a>
          를 참조하세요.
        </p>
      </div>
    </div>
  );
}
