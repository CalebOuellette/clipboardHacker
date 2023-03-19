import CopyPaster from "~/components/CopyPaster";

export default function Home() {

  return (
    <main class="text-gray-700 p-3">
      <h1 class="max-6-xs text-4xl bold">
        Clipboard Hacker
      </h1>
      <p>A utility for interacting with the clipboard.</p>
      <CopyPaster />
    </main>
  );
}
