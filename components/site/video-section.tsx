export function VideoSection() {
  return (
    <section id="videos" className="overflow-hidden bg-secondary/30 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <span className="font-medium text-primary">Mirá WIPuP en acción</span>
          <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl">Nuestros productos en video</h2>
        </div>
        <div className="flex justify-center">
          <div className="w-full max-w-sm overflow-hidden rounded-2xl bg-card shadow-lg transition-all duration-500 hover:scale-[1.02] hover:shadow-elevated">
            <video
              src="/videos/wipup-demo.mp4"
              className="aspect-[9/16] w-full object-cover"
              controls
              preload="metadata"
              playsInline
            >
              Tu navegador no soporta videos.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
