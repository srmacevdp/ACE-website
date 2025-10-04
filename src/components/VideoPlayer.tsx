
const VideoPlayer = () => {
  return (
    <div
      className="relative w-full max-w-3xl mx-auto p-1 rounded-xl overflow-hidden"
      style={{
        border: "12px solid transparent",
        borderImage: "url('/border.png') 30 round", // replace with your image path
        borderRadius: "1rem",
      }}
    >
      <video
        className="w-full h-auto rounded-lg"
        controls
        poster="/thumbnail.jpg" // optional preview image
      >
        <source src="/sample.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
