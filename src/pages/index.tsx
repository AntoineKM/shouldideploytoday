import Datepicker from "@components/Datepicker";
import { Container, InlineCode, Text } from "@tonightpass/kitchen";
import dayjs from "dayjs";
import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import React from "react";
import { ShouldIDeployResponse } from "./api";

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
          date: date.toISOString()
        }
      })
    }
  }, [data.date, date, router]);


  return (
    <Container align={"center"} justify={"center"} h={"100%"} >
      <Text transform={"uppercase"} size={"large"} color={"lighter"}>Should I Deploy Today?</Text>
      <Text transform={"uppercase"} weight={"extraBold"} size={"extraTitle"} mt={"large"}>{data.message}</Text>
      <Container mt={"large"} flex={0}>
        <Datepicker setDate={setDate} />
      </Container>
    </Container>
  );
};

MainPage.getInitialProps = async (ctx: NextPageContext) => {
  const { req, query } = ctx;
  const protocol = req?.headers['x-forwarded-proto'] || 'http'
  const baseUrl = req ? `${protocol}://${req.headers.host}` : ''
  const res = await fetch(`${baseUrl}/api${query.date ? `?date=${query.date}` : ""}`);
  const data: ShouldIDeployResponse = await res.json();

  return {
    data
  };
};


export default MainPage;
