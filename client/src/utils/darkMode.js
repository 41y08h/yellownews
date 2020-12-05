export default function darkMode() {
  const html = document.body.parentElement;
  const hours = new Date().getHours();
  const isDayTime = hours > 6 && hours < 20;
  if (!isDayTime) {
    html.classList.add("dark");
  }
}
