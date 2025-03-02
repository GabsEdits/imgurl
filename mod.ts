import { encodeBase64 } from "jsr:@std/encoding";

const filePath = prompt("What's the file path?")?.trim();
if (!filePath) {
  console.error("No file path provided!");
  Deno.exit(1);
}

const mimeType = filePath.toLowerCase().endsWith(".png")
  ? "image/png"
  : prompt("Enter the MIME type (e.g., image/jpeg, image/gif):")?.trim();

if (!mimeType) {
  console.error("No MIME type provided!");
  Deno.exit(1);
}

try {
  const fileData = await Deno.readFile(filePath);
  const base64Image = encodeBase64(fileData);

  console.log(`data:${mimeType};base64,${base64Image}`);
} catch (error) {
  console.error("Error reading the file:", error.message);
}
