import Image from "next/image";

interface LinkCardProps {
  title: string;
  url: string;
  icon: string | null;
  logoImage: string | null;
  color: string | null;
}

export default function LinkCard({
  title,
  url,
  icon,
  logoImage,
  color,
}: LinkCardProps) {
  const bgColor = color || "var(--color-primary)";

  return (
    <div
      className="group block bg-white rounded-xl overflow-hidden border border-stone-200/60 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center w-full h-full rounded-xl overflow-hidden"
        style={{ backgroundColor: bgColor }}
      >
        {/* Logo circle */}
        {logoImage ? (
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden ring-1 ring-white/50 shrink-0 ml-3 my-2">
            <Image
              src={logoImage}
              alt={title}
              width={56}
              height={56}
              unoptimized={logoImage.startsWith("http")}
              className="w-full h-full object-cover"
            />
          </div>
        ) : icon ? (
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 flex items-center justify-center shrink-0 ml-3 my-2 text-xl">
            {icon}
          </div>
        ) : null}

        {/* Title */}
        <span
          className="relative flex-1 text-center text-white font-semibold text-[15px] py-4 px-4 tracking-wide"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}
        </span>

        {/* Spacer for balance */}
        {(logoImage || icon) && (
          <div className="w-12 sm:w-14 shrink-0 mr-3" />
        )}

      </a>
    </div>
  );
}
