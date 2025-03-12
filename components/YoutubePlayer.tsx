"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import YouTube, { YouTubeProps } from "react-youtube";
import { Button } from "@/components/ui/button";
import { CirclePlay } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";

interface PropType {
  videoKey: string;
}

const YoutubeModalPlayer = (props: PropType) => {
  const { videoKey } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    event.target.playVideo();
  };

  const opts: YouTubeProps["opts"] = {
    playerVars: {
      autoplay: 1,
    },
  };

  const optsMobile: YouTubeProps["opts"] = {
    width: "300",
    height: "250",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="">
      {/* Tombol untuk membuka modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button className="text-black w-fit">
            <CirclePlay className="mr-2" />
            Play Trailer
          </Button>
        </DialogTrigger>

        {/* Modal Fullscreen */}
        <DialogContent className="min-w-3 lg:min-w-2xl h-fit flex-col items-center justify-center bg-black ">
          <DialogTitle hidden>Trailer</DialogTitle>
          <YouTube videoId={videoKey} opts={window.innerWidth > 640 ? opts : optsMobile} onReady={onPlayerReady} onError={() => alert("Trailer not found")} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default YoutubeModalPlayer;
