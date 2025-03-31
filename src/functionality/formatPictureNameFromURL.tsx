import { Photo } from "pexels";

export default function formatPictureNameFromURL(item: Photo) {
  const name = item.url.split("/photo")[1].split("-").slice(0, -1);
  const nameString = name.join(" ").replace("/", "");
  return nameString.charAt(0).toUpperCase() + nameString.slice(1) + ".";
}
