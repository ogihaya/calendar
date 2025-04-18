import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "本当の残り時間がわかるToDoリストカレンダー",
  description: "本当の残り時間がわかるToDoリストカレンダーを製作中",
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

export default function RootLayout({//この名前の関数の返り値が表示される
  children,//子コンポーネントを受け取る
}: Readonly<{//ただし読み取りだけ、変更できない
  children: React.ReactNode;//childrenの型定義。なんでもいいってこと
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} antialiased`}//bodyの文字のフォントを指定、antialiasedは文字を滑らかにする
      >
        {children}//childrenはpage.tsxが基本らしい
      </body>
    </html>
  );
}
