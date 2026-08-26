import Image from "next/image";

export default function WallHole({ src, alt }) {
  return (
    <div className="wall-punch">
      <div className="wall-punch-crack wall-punch-crack-1" />
      <div className="wall-punch-crack wall-punch-crack-2" />
      <div className="wall-punch-crack wall-punch-crack-3" />
      <div className="wall-punch-crack wall-punch-crack-4" />

      <div className="wall-punch-shadow" />
      <div className="wall-punch-outer" />
      <div className="wall-punch-mid" />
      <div className="wall-punch-inner">
        <Image src={src} alt={alt} fill sizes="260px" className="wall-punch-photo" />
        <div className="wall-punch-vignette" />
      </div>

      <div className="wall-punch-debris wall-punch-debris-1" />
      <div className="wall-punch-debris wall-punch-debris-2" />
      <div className="wall-punch-debris wall-punch-debris-3" />
      <div className="wall-punch-debris wall-punch-debris-4" />
    </div>
  );
}
