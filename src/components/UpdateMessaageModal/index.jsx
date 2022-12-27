/* eslint-disable import/first */
/* eslint-disable jsx-quotes */
import {
  AtButton,
  AtModal,
  AtModalAction,
  AtModalContent,
  AtModalHeader,
  AtTimeline,
} from "taro-ui";

import "./index.scss";
import { View } from "@tarojs/components";

/**
 *
 * @param {{openedState:Array, title:string, description:string[],content:string [][]}} param0
 * @returns
 */
const MessageModal = ({ openedState, title, description, content }) => {
  // console.log();

  const [isOpened, setIsOpented] = openedState;

  return (
    <AtModal isOpened={isOpened} closeOnClickOverlay={false}>
      <AtModalHeader>{title}</AtModalHeader>
      <AtModalContent>
        <AtTimeline
          items={description.map((item, index) => ({
            title: item,
            content: content[index],
          }))}
        />
      </AtModalContent>
      <AtModalAction>
        <View className="action-view">
          <AtButton
            className="action-btn"
            type="primary"
            onClick={() => setIsOpented(false)}
          >
            好的
          </AtButton>
        </View>
      </AtModalAction>
    </AtModal>
  );
};

export default MessageModal;
