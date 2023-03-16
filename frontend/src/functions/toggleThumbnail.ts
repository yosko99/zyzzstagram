const toggleThumbnail = (canvas: HTMLCanvasElement) => {
  const thumbnail = document.getElementById('thumbnail');
  thumbnail?.setAttribute('src', canvas.toDataURL());

  const thumbnailContainer = document.getElementById('thumbnail-container');
  thumbnailContainer?.classList.remove('d-none');
  thumbnailContainer?.classList.add('d-flex');
};

export default toggleThumbnail;
