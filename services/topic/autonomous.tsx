//https://dev.screen9.com/doc/rest/video.html
const video = (
  <div style="position:relative;width:100%;padding-bottom:56.25%;">
    <iframe
      allow="autoplay; fullscreen"
      allowfullscreen
      referrerpolicy="no-referrer-when-downgrade"
      src="https://api.screen9.com/embed/QDr6vbIJ20wEPMvAkZRHWPzGKVYBFfufR9IwJ-6-Z1S4t_d2BMUshIquwiFVVQ8H"
      style="border:0;width:100%;height:100%;position:absolute"
      title="Autonomous ocean research by Akvaplan-niva"
    >
    </iframe>
  </div>
);
export const autonomous = new Map([
  ["no", video],
  ["en", video],
]);
