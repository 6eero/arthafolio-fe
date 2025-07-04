"use client";

import {
  DashboardSearchContext,
  useDashboardSearchContext,
} from "@/Context/Dashboard";
import { ResourceLoader } from "@/components/layout/ResourceLoader";
import { useDashboardSearchActions } from "@/api/Holdings/tasks";
import * as R from "ramda";
import Header from "@/components/layout/Header";
import SummaryCard from "./components/SummaryCard";
import { Banknote, Bitcoin, Landmark } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef, useState } from "react";
import { DataTable } from "./components/DataTable";
import { useAssetColumns } from "@/Models/Dashboard/table";
import { Asset, Totals } from "@/app/types/dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Card from "@/components/custom/Card";
import { useTranslations } from "next-intl";
import Pie from "./components/Charts/Pie";
import Linee from "./components/Charts/Line";
import AssetItem from "./components/AssetItem";
import Button from "@/components/custom/Button";
import DrawerDialog from "@/components/custom/DrowerDialog";
import ButtonFloating from "@/components/custom/ButtonFloating";

const Dashboard = () => {
  const context = useDashboardSearchContext();
  const { onLoad } = useDashboardSearchActions();
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
  const t = useTranslations("");
  const [openEditProfile, setOpenEditProfile] = useState(false);

  const columns = useAssetColumns();

  const totals = R.pathOr<Totals>({ total: 0 }, ["data", "totals"])(context);
  const history = R.pathOr([], ["data", "history"])(context);
  const assets = R.pathOr<Asset[]>(
    [
      {
        label: "",
        quantity: 0,
        price: 0,
        value: 0,
        category: "",
        percentage: 0,
      },
    ],
    ["data", "assets"]
  )(context);

  return (
    <ResourceLoader onLoad={onLoad} context={DashboardSearchContext}>
      <DrawerDialog open={openEditProfile} setOpen={setOpenEditProfile} />
      <ButtonFloating
        onClick={() => setOpenEditProfile(true)}
        className="xl:hidden"
      />
      <div className="w-full flex flex-col">
        <Header title={t("dashboard.title")} />
        <div className="flex-1 flex flex-col gap-4 sm:m-4 mt-4 ">
          {/* Desktop */}
          <div className="h-full hidden xl:flex gap-4">
            {R.map(
              ([key, value]) => (
                <SummaryCard
                  key={key}
                  itemKey={`dashboard.totals.${key}`}
                  icon={Banknote}
                  value={value}
                />
              ),
              R.toPairs(totals)
            )}
          </div>
          {/* Mobile */}
          <div className="xl:hidden w-full">
            <Carousel plugins={[plugin.current]}>
              <CarouselContent>
                {R.map(
                  ([key, value]) => (
                    <CarouselItem key={key}>
                      <SummaryCard
                        itemKey={`dashboard.totals.${key}`}
                        icon={
                          {
                            total: Banknote,
                            crypto: Bitcoin,
                            etf: Landmark,
                          }[key] || Banknote
                        }
                        value={value}
                      />
                    </CarouselItem>
                  ),
                  R.toPairs(totals)
                )}
              </CarouselContent>
            </Carousel>
          </div>

          <div className="w-full flex gap-4 xl:flex-row  flex-col">
            <Linee data={history} />
            <Pie data={assets} />
          </div>

          {/* Desktop */}
          <Tabs defaultValue="all" className="xl:block hidden">
            <Card
              title={"dashboard.table.title"}
              description="dashboard.table.description"
              action={
                <div>
                  <Button
                    variant="default"
                    onClick={() => setOpenEditProfile(true)}
                    className="mr-4"
                  >
                    {t("dashboard.add_investment")}
                  </Button>

                  <TabsList>
                    <TabsTrigger value="all">
                      {t("generic.categories.all")}
                    </TabsTrigger>
                    <TabsTrigger value="cryptocurrencies">
                      {t("generic.categories.crypto")}
                    </TabsTrigger>
                    <TabsTrigger value="etf">
                      {t("generic.categories.etf")}
                    </TabsTrigger>
                  </TabsList>
                </div>
              }
            >
              <TabsContent value="all">
                <DataTable
                  columns={columns}
                  data={R.filter((el: Asset) => el.category !== "liquidity")(
                    assets
                  )}
                />
              </TabsContent>
              <TabsContent value="cryptocurrencies">
                <DataTable
                  columns={columns}
                  data={R.filter((el: Asset) => el.category === "crypto")(
                    assets
                  )}
                />
              </TabsContent>
              <TabsContent value="etf">
                <DataTable
                  columns={columns}
                  data={R.filter((el: Asset) => el.category === "etf")(assets)}
                />
              </TabsContent>
            </Card>
          </Tabs>

          {/* Mobile */}
          <Tabs defaultValue="all" className="xl:hidden">
            <Card
              title={"dashboard.table.title"}
              description="dashboard.table.description"
            >
              {R.map(
                (asset: Asset) => (
                  <AssetItem
                    key={asset.label}
                    label={asset.label}
                    quantity={asset.quantity}
                    price={asset.price}
                    value={asset.value}
                    percentage={asset.percentage}
                    category={asset.category}
                  />
                ),
                assets
              )}
            </Card>
          </Tabs>
        </div>
      </div>
    </ResourceLoader>
  );
};

export default Dashboard;
