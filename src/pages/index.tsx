import Datepicker from "@components/Datepicker";
import { Container, InlineCode, Text, useKeyboard, KeyCode } from "kitchn";
import dayjs from "dayjs";
import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import React from "react";

type ShouldIDeployResponse = {
  timezone: string;
  date: string;
  shouldideploy: boolean;
  message: string;
}

interface MainPageProps {
  data: ShouldIDeployResponse
}

const MainPage: NextPage<MainPageProps> = ({
  data
}: MainPageProps) => {
  const [date, setDate] = React.useState(dayjs());
  const router = useRouter();

  React.useEffect(() => {
    if (!dayjs(data.date).isSame(date, "day")) {
      router.push({
        pathname: "/",
        query: {
          date: date.format("YYYY-MM-DD")
        }
      })
    }
  }, [data.date, date, router]);

  const refresh = () => {
    router.push({
      pathname: "/",
      query: {
        date: date.format("YYYY-MM-DD")
      }
    })
  };

  const { bindings } = useKeyboard(
    (e) => {
      if (e.keyCode === KeyCode.Space) {
        console.log("space pressed");
        refresh();
      }
    },
    [KeyCode.Space],
  );

  return (
    <Container align={"center"} justify={"center"} h={"100vh"} px={"normal"} {...bindings}>
      <Text transform={"uppercase"} size={"large"} color={"lighter"}>Should I Deploy Today?</Text>
      <Text transform={"uppercase"} weight={"extraBold"} size={"extraTitle"} mt={"large"} align={"center"}>{data.message}</Text>
      <Text mt={"medium"} monospace onClick={refresh} style={{
        cursor: "pointer",
        userSelect: "none"
      }}>
        Hit <InlineCode>Space</InlineCode> or Click
      </Text>
      <Container mt={"large"} flex={0}>
        <Datepicker setDate={setDate} />
      </Container>
    </Container>
  );
};

MainPage.getInitialProps = async (ctx: NextPageContext) => {
  const { query } = ctx;
  const res = await fetch(`https://shouldideploy.today/api${query.date ? `?date=${query.date}` : ""}`);
  const data: ShouldIDeployResponse = await res.json();

  return {
    data
  };
};

export default MainPage;
