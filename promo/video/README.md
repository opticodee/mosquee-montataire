# Vidéo promo MasjidIA

`MasjidIA_promo.mp4` — 32 s, 1080×1920 (9:16, Reels / TikTok / Shorts / Stories), musique originale générée.

Pour modifier les textes : éditer `promo.html` (ouvrir dans un navigateur pour un aperçu en boucle), puis régénérer :

```bash
pip install numpy imageio-ffmpeg
python3 music.py                                  # bande-son -> music.wav
FFMPEG=$(python3 -c "import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())") \
  node render.mjs video                            # frames -> MasjidIA_promo.mp4 (Playwright requis)
```
