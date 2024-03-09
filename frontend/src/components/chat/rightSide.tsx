import React from "react";
import "moment-timezone";
import FriendRightSide from "./friendRightSide";
import ChannelRightSide from "./channelRightSide";

function RightSide() {
  return (
    <>
      <FriendRightSide />
      <ChannelRightSide />
    </>
  );
}

export default RightSide;
