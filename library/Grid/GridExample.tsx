import React from "react";
import Img from "../Img/Img";
import Grid from "./Grid.Component";

const GridExample = () => {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Col span={2}>
          <Img
            src={
              "https://images.pexels.com/photos/8091793/pexels-photo-8091793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            alt="Phyllis"
          />
        </Grid.Col>
        <Grid.Col>
          <Img
            src={
              "https://images.pexels.com/photos/8585557/pexels-photo-8585557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            alt="Johnnie"
          />
        </Grid.Col>
      </Grid.Row>
      <Grid.Row>
        <Grid.Col>
          <Img
            src={
              "https://images.pexels.com/photos/13429381/pexels-photo-13429381.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            alt="Charles"
          />
        </Grid.Col>
        <Grid.Col span={2}>
          <Img
            src={
              "https://images.pexels.com/photos/3232533/pexels-photo-3232533.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            alt="Cesar"
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <Img
            src={
              "https://images.pexels.com/photos/19972221/pexels-photo-19972221/free-photo-of-fog-over-deep-forest.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            alt="Alivia"
          />
        </Grid.Col>
      </Grid.Row>
      <Grid.Row>
        <Grid.Col span={3}>
          <Img
            src={
              "https://images.pexels.com/photos/13715367/pexels-photo-13715367.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            alt="Albertha"
          />
        </Grid.Col>
        <Grid.Col span={2}>
          <Img
            src={
              "https://images.pexels.com/photos/13367163/pexels-photo-13367163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            alt="Israel"
          />
        </Grid.Col>
        <Grid.Col>
          <Img
            src={
              "https://images.pexels.com/photos/5470670/pexels-photo-5470670.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            alt="Jamison"
          />
        </Grid.Col>
      </Grid.Row>
    </Grid>
  );
};

export default GridExample;
