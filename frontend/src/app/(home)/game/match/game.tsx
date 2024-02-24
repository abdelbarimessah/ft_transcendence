
// import { Game as PhaserGame } from "phaser";
// import { useContext, useEffect, useRef, useState } from "react";
// import pongGame from "@/components/game/PongGame";
// import { SocketContext } from "@/app/SocketContext";

// let newGame: Phaser.Game;
// class MyScene extends Phaser.Scene {
//   constructor() {
//     super('MyScene');
//   }
//   create() {
//     var button;
//     const graphics = this.add.graphics();
//     graphics.lineStyle(1, 0xffffff);
//     graphics.strokeRoundedRect(375, 280, 150, 40, 20);

//     button = this.add.text(450, 300, 'Start Game!', { color: '#fff' })
//       .setInteractive()
//       .on('pointerdown', () => {
//         this.scene.start('PongGame');
//       });
//     button.setOrigin(0.5, 0.5);
//   }
// }



// export default function Game() {
//   const socketClient = useContext(SocketContext);
//   const parentEl = useRef<HTMLDivElement>(null);
//   let [game, setGame] = useState<PhaserGame | null>(null);
//   const params = useSearchParams();
//   const roomName: any = params.get("room");

//   useEffect(() => {
//     if (!parentEl.current) return;

//     const gameConfig: Phaser.Types.Core.GameConfig = {
//       type: Phaser.CANVAS,
//       width: 900,
//       height: 600,
//       physics: {
//         default: 'arcade',
//         arcade: {
//           gravity: { y: 0 },
//           fps: 120,
//         }
//       },
//       scale: {
//         mode: Phaser.Scale.FIT,
//         width: 900,
//         height: 600
//       },
//       scene: [new pongGame(socketClient, roomName)]
//     };

//     const newGame = new PhaserGame({ ...gameConfig, parent: parentEl.current, width: parentEl.current.offsetWidth, height: parentEl.current.offsetHeight });
//     setGame(newGame);

//     return () => {
//       newGame?.destroy(true);
//       console.log("🐲 DESTROY 🐲");
//     };
//   }, []);

//   return (
//     <div ref={parentEl} className="flex items-center justify-center w-full flex-1" />
//   );
// }




import { Game as PhaserGame } from "phaser";
import { useContext, useEffect, useRef, useState } from "react";
import pongGame from "@/components/game/PongGame";
import { SocketContext } from "@/app/SocketContext";
import { useSearchParams } from "next/navigation";

export default function Game() {
  const socketClient = useContext(SocketContext);
  const parentEl = useRef<HTMLDivElement>(null);
  let [game, setGame] = useState<PhaserGame | null>(null);
  const params = useSearchParams();
  const roomName: any = params.get("room");

  useEffect(() => {
    if (!parentEl.current) return;

    const gameConfig: Phaser.Types.Core.GameConfig = {
      type: Phaser.CANVAS,
      width: 900,
      height: 600,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
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
      console.log("🐲 DESTROY 🐲");
    };

  }, []);

  useEffect(() => {
    const handlePlayerLeave = () => {
      console.log('gME IN useeffect', game);

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
