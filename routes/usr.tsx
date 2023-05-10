import { getAkvaplanist } from "akvaplan_fresh/services/akvaplanist.ts";

import {
  Card,
  Page,
  PeopleCard as PersonCard,
} from "akvaplan_fresh/components/mod.ts";

import { lang as langSignal } from "akvaplan_fresh/text/mod.ts";

import { Akvaplanist } from "akvaplan_fresh/@interfaces/mod.ts";

import {
  HandlerContext,
  Handlers,
  PageProps,
  RouteConfig,
} from "$fresh/server.ts";

interface AtHome {
  akvaplanist: Akvaplanist;
}

export const config: RouteConfig = {
  routeOverride: "/:at(@|~):id([a-zA-Z]{3}){/:name}*",
  //@... => EN
  //~... => NO
};

const html = `<section id="research" class="">
<div class="container">
    <div class="row">
        <div class="col-lg-12 text-center">
            <h2 class="section-heading">Research Topics</h2>
            <!-- <h3 class="section-subheading text-muted">bleh</h3> -->
        </div>
    </div>
</div>


<div class="container">
    <div class="row research-topic">
        <div class="col-md-4">
                <img src="img/research/bgc-argo.png" class="img-responsive" alt="">
        </div>
        <div class="col-lg-8">
                <h4>Bio-optical Argo floats</h4>
                <p class="text-muted"></p><p>Remote sensing of the global ocean using satellites monitoring the state of marine ecosystems year-round. In the Arctic, the presence of sea ice and the long polar night are a showstopper for many of these approaches. <a href="http://biogeochemical-argo.org">Biogeochemical (BGC) Argo floats</a> are autonomous robots that drift around with ocean currents, going up and down in the water column as they sample the world's oceans. The Takuvik laboratory that I am a part of has been deploying BGC Argo floats in Baffin Bay to study the year-round evolution of ecosystem dynamics, even during winter when satellites cannot look into the ocean.</p><p></p>
                <!-- <p class="text-muted"><i>find out more</i> &rarr; <a class="page-scroll" href="#"></a></p> -->
        </div>
    </div>
</div>



<div class="container">
    <div class="row research-topic">
        <div class="col-md-4">
                <img src="img/research/rvhh.jpg" class="img-responsive" alt="">
        </div>
        <div class="col-lg-8">
                <h4>Vertical turbulent nitrate fluxes</h4>
                <p class="text-muted"></p><p>Without regular vertical mixing, most of the world ocean would be dead and deserted. The reason is that algae have a tendency to sink and hence take scarce plant nutrients with them to depth. These nutrients' only chance of getting back into the sunlight, where algae grow, is when the ocean is stirred by winds, the tides, upwelling of deeper water, or other currents. Because of the huge amounts of river and other fresh water sources in the Arctic Ocean, the Ocean is especially resistant to such mixing. Hence large parts of the Arctic Ocean are among the nutrient-poorest regions of the world's oceans which drastically limits its productivity. My Ph.D. thesis was one of the first systematic attempts to measure this 'vertical turbulent nitrate flux' with a large in-situ data set collected from drifting ice camps, research vessels, and moored instruments.</p><p></p>
                <!-- <p class="text-muted"><i>find out more</i> &rarr; <a class="page-scroll" href="#"></a></p> -->
        </div>
    </div>
</div>



<div class="container">
    <div class="row research-topic">
        <div class="col-lg-1">
        </div>
        <div class="col-lg-8">
                <h4>Ice-ocean interaction</h4>
                <p class="text-muted"></p><p>One of the most distinctive features of Arctic marine ecosystems is the presence of sea ice. It alters how wind moves around the water and how those currents mix the upper ocean; it changes the flow of heat from the atmosphere into the water and back; it changes the supply of spent surface waters with deep, nutrient rich ones; it changes the density of the sea water and hence the turbulent mixing of the very environment in which plankton lives. It is the lack of sunlight in winter that makes the water freeze, but it is the heat stored in the ocean that makes the ice not grow forever. All of these phenomena are what oceanographers refer to when they use the rather prosaic expression 'flux of momentum, heat, salt, and other tracers'.</p> <p>Given its relevance for the Arctic summer, when plankton grows, I have been especially interested in melting sea ice. Melting sea ice creates a layer that resists vertical mixing, often a drastic change from the more intense mixing that happens in winter, which I explored in two studies in <a href="papers/randelhoff2014effects">2014</a> and <a href="papers/randelhoff2017turbulent">2017</a>.</p><p></p>
                <!-- <p class="text-muted"><i>find out more</i> &rarr; <a class="page-scroll" href="#"></a></p> -->
        </div>
        <div class="col-md-3">
                <img src="img/research/tic.png" class="img-responsive" alt="">
        </div>
    </div>
</div>


</section>`;

export const handler: Handlers = {
  async GET(req: Request, ctx: HandlerContext) {
    const { at, id } = ctx.params;
    const akvaplanist = await getAkvaplanist(id.toLowerCase());
    if (!akvaplanist) {
      //return ctx.renderNotFound();
    }
    akvaplanist.bio = html;
    const lang = at === "~" ? "no" : "en";
    langSignal.value = lang;
    return ctx.render({ akvaplanist, at });
  },
};

export default function AtHome({ data }: PageProps) {
  const { akvaplanist, at } = data;
  return (
    <Page>
      <PersonCard person={akvaplanist} />
      <Card>
      </Card>
      <div dangerouslySetInnerHTML={{ __html: akvaplanist.bio }} />
    </Page>
  );
}
