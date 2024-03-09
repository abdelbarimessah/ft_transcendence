import { Game as PhaserGame } from "phaser";
import { useContext, useEffect, useRef, useState } from "react";
import pongGame from "@/components/game/PongGame";
import { SocketContext } from "@/app/SocketContext";
import { useRouter, useSearchParams} from "next/navigation";
import { toast } from "sonner";

export default function Game() {
  const socketClient = useContext(SocketContext);
  const parentEl = useRef<HTMLDivElement>(null);
  let [game, setGame] = useState<PhaserGame | null>(null);
  const params = useSearchParams();
  const roomName: any = params.get("room");

  const router = useRouter();

  useEffect(() => {
    if (!parentEl.current) return;

    const gameConfig: Phaser.Types.Core.GameConfig = {
      type: Phaser.CANVAS,
      width: 900,
      height: 600,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: {x: 0,  y: 0 },
          fps: 120,
        }
      },
      scale: {
        mode: Phaser.Scale.FIT,
        width: 900,
        height: 600
      },
      scene: [new pongGame(socketClient, roomName)]
    };

    const newGame = new PhaserGame({ ...gameConfig, parent: parentEl.current, width: parentEl.current.offsetWidth, height: parentEl.current.offsetHeight });
    setGame(newGame);

    return () => {
      newGame?.destroy(true);
    };

  }, [roomName, socketClient]);


  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        toast.error('You left the game Page !')
        router.push('/game')
        
        game?.pause();
      } else {
        game?.resume();
      }
    };
  
    document.addEventListener('visibilitychange', handleVisibilityChange);
  
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [game, router]);
  

  useEffect(() => {
    const handlePlayerLeave = () => {
      game?.destroy(true);
    };

    socketClient.on('OnePlayerLeaveTheRoom', handlePlayerLeave);

    return () => {
      socketClient.off('OnePlayerLeaveTheRoom', handlePlayerLeave);
    };

  }, [game, socketClient]);

  return (
    <div ref={parentEl} className="flex items-center justify-center w-full flex-1" />
  );
}
