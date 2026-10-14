type GalleryCardProps = {
  image: string;
  alt: string;
  tag: string;
  onOpen: () => void;
};

const GalleryCard = ({ image, alt, tag, onOpen }: GalleryCardProps) => {
  return (
    <button type="button" className="sorath-gallery-card" onClick={onOpen}>
      <img src={image} alt={alt} />
      <span>{tag}</span>
    </button>
  );
};

export default GalleryCard;
