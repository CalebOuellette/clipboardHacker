import CopyPaster from "~/components/CopyPaster";

export default function Home() {
  return (
    <main class="text-slate-50 p-3 bg-gray-600 h-screen">
      <div class="flex flex-row justify-between items-start">
        <div class="flex flex-col justify-start">
          <div class="text-[#ffffff] text-3xl [object Object]-[Inter] whitespace-nowrap">
            Clipboard Hacker
          </div>
          <div class="mb-10 text-[#ffffff] text-base [object Object]-[Inter] whitespace-nowrap">
            A utility for interacting with the clipboard.
          </div>
          <div class="text-[#ffffff]">Press Cmd + V to get started.</div>
        </div>
      </div>
      <CopyPaster />
    </main>
  );
}
