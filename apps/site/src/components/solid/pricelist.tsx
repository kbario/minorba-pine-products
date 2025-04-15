/** @jsxImportSource solid-js */

import {
  createEffect,
  createMemo,
  createSignal,
  type Component,
  For,
  Show,
} from "solid-js";

import {
  flexRender,
  getCoreRowModel,
  type ColumnDef,
  createSolidTable,
} from "@tanstack/solid-table";

import type { PostVariant, PricelistData, SawnVariant } from "@minorba/prices";
import {
  date,
  PostVariantDescriptions,
  PostVariantLables,
  PostVariants,
  rebate,
  retail,
  SawnVariantDescriptions,
  SawnVariantLables,
  SawnVariants,
  wholesale,
} from "@minorba/prices";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../../fonts/NotoSans-Regular-normal.js";
import type {
  FinalConfig,
  PostPricelistData,
  SawnPricelistData,
} from "@minorba/prices/src/types/config.js";

const TABLE_ID = "minorba-pricelist-table";
const ROUNDS_TABLE_ORDER = [
  PostVariants.Regular,
  PostVariants.Pointed,
  PostVariants.HalfPosts,
  PostVariants.SheepYard,
  PostVariants.CattleYard,
  PostVariants.HorsePosts,
] satisfies PostVariant[];

const SAWN_TABLE_ORDER = [
  SawnVariants.Sleepers,
  SawnVariants.Sawn,
  SawnVariants.HouseStumps,
  SawnVariants.SolePlates,
];

const LENGTH_IN_TABLE: SawnVariant[] = [
  SawnVariants.Sleepers,
  SawnVariants.HouseStumps,
  SawnVariants.SolePlates,
] satisfies SawnVariant[];

const retailCoverInfo = [
  {
    header: "Freight",
    body: "Freight is $55.00 per Tonne to the Perth Depot. Freight is $55.00 for orders under 1 tonne. Freight to other locations is to be organised by client, please contact Minorba for carrier suggestions. Prices may change at the Manager's discretion.",
  },
  {
    header: "Payment",
    body: "Payment must be made prior to removal of products from the premises. Minorba accepts cash and Eftpos payments. Alternatively, Minorba accepts EFT via email invoice or Cheque payments with proper identification.",
  },
  {
    header: "Treatment",
    body: "All posts are treated H4, if a H5 post is required then these will need to be ordered.",
  },
  {
    header: "Pointed Posts",
    body: "There is a minimum 10 day waiting period for all pointed post orders. A 50% deposit is required at the time of order.",
  },
  {
    header: "Post Diameters",
    body: "All posts 200mm diameter and smaller are milled to a true round making them perfectly round along their length. Posts with a diameter over 200mm are debarked, maintaining any natural diameter variation.",
  },
  {
    header: "Transportation Safety",
    body: "Safety is one of our highest priorities. It is the customer's responsibility to provide timber gluts of the size 100mm x 75mm x 2300mm for us to load your vehicle legally. If you do not provide gluts, only a legal volume of your product will be loaded. Minorba will be responsible for the loading configuration. If your products do not fit legally on the vehicle, you will have to return for the surplus. Transportation of goods to or from Minorba's Yard must be compliant with the Occupational Safety and Health Act 1984, the Chain of Responsibility Legislation contained in the Road Traffic (Administration) Act 2008 and the Road Traffic (Vehicles) Act 2012.",
  },
];
const wholesaleCoverInfo = [
  {
    header: "Packing Fee",
    body: "Wholesale Price is for Full packs only. Mixed packs will be charged a packing fee of $44.00 per pack or order at Managers discretion.",
  },
  {
    header: "Freight",
    body: "Freight is at $66.00 per Tonne to Perth Depot at Campbell Transport (corner of Da Vinci Way & McCook St, Forestdale). Freight for orders under 1 tonne is $66.00. Prices may change at the Manager's discretion.",
  },
  {
    header: "Post Diameters",
    body: "All posts 200mm diameter and smaller are milled to a true round making them perfectly round along their length. Posts with a diameter over 200mm are debarked, maintaining any natural diameter variation.",
  },
  {
    header: "Transportation Safety",
    body: "Safety is one of our highest priorities. It is the customer's responsibility to provide timber gluts of the size 100mm x 75mm x 2300mm for us to load your vehicle legally. If you do not provide gluts, only a legal volume of your product will be loaded. Minorba will be responsible for the loading configuration. If your products do not fit legally on the vehicle, you will have to return for the surplus. Transportation of goods to or from Minorba's Yard must be compliant with the Occupational Safety and Health Act 1984, the Chain of Responsibility Legislation contained in the Road Traffic (Administration) Act 2008 and the Road Traffic (Vehicles) Act 2012.",
  },
];

const defaultColumns: ColumnDef<FinalConfig>[] = [
  {
    accessorKey: "length",
    header: "Length (m)",
  },
  {
    accessorKey: "diameter",
    header: "Diameter (mm)",
  },
  {
    accessorKey: "grade",
    header: "Grade",
  },
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "postPerPack",
    header: "Posts / Pack",
  },
  {
    accessorKey: "postPrice",
    header: "Post Cost ($)",
  },
  {
    accessorKey: "packPrice",
    header: "Pack Cost ($)",
  },
  {
    accessorKey: "weight",
    header: "Weight",
  },
];

const makePdfName = () =>
  `MinorbaPriceList_${new Intl.DateTimeFormat(navigator.languages).format(Date.now())}.pdf`;

export default () => {
  const pricelistData = {
    retail,
    wholesale,
    rebate,
  } as const;
  type PricelistDatum = keyof typeof pricelistData;
  const pricelistDataKeys: PricelistDatum[] = Object.keys(
    pricelistData,
  ) as PricelistDatum[];

  const [ogDataS, setOgData] = createSignal<PricelistDatum>("retail");
  const dataS = createMemo<PricelistData>(() => {
    const a = pricelistData[ogDataS()];
    console.log({ a });
    return a;
  });

  const makePdf = async (isWholesale: boolean) => {
    const pdf = new jsPDF("p", "pt", "a4");

    pdf.addPage();
    pdf.addPage();
    pdf.addPage();
    pdf.setPage(3);
    const tables = document.getElementsByClassName(TABLE_ID);
    for (let i = 0; i < tables.length; i++) {
      const a = tables.item(i) as HTMLTableElement | undefined;
      if (!a) continue;
      autoTable(pdf, {
        html: a,
        useCss: true,
        margin: { top: 50, bottom: 50 },
        rowPageBreak: "avoid",
      });
    }
    await new Promise<jsPDF>((res, reg) => {
      const el = document.getElementById("secPage");
      if (!el) return res(pdf);
      const st = document.createElement("style");
      st.innerHTML = `.font-roboto{font-family:'Helvetica'}`;
      el.appendChild(st);
      el.style.width = `${pdf.internal.pageSize.width - 100}px`;
      el.style.height = `${pdf.internal.pageSize.height - 100}px`;
      pdf.setPage(2);
      pdf
        .html(el, {
          callback: res,
        })
        .catch(reg);
    });
    pdf.setPage(1);
    await new Promise<jsPDF>((res, reg) => {
      const el = document.getElementById("cover");
      if (!el) return res(pdf);
      const st = document.createElement("style");
      st.innerHTML = `.font-roboto{font-family:'Helvetica'}`;
      el.appendChild(st);
      el.style.width = `${pdf.internal.pageSize.width}px`;
      el.style.height = `${pdf.internal.pageSize.height - 100}px`;
      pdf
        .html(el, {
          callback: res,
        })
        .catch(reg);
    });

    const totalPages = pdf.internal.pages.length - 1;
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(10);
      pdf.setTextColor("#0f172a");
      pdf.text("Minorba Pine Products", 40, 25, {
        align: "left",
        baseline: "top",
      });
      pdf.text(
        `${ogDataS() === "retail" ? "Retail" : "Wholesale"} Price List`,
        pdf.internal.pageSize.getWidth() - 40,
        25,
        {
          align: "right",
          baseline: "top",
        },
      );
      pdf.text(date, 40, pdf.internal.pageSize.getHeight() - 25, {
        align: "left",
        baseline: "bottom",
      });
      pdf.text(
        "Page " + i + " of " + totalPages,
        pdf.internal.pageSize.getWidth() - 40,
        pdf.internal.pageSize.getHeight() - 25,
        { align: "right", baseline: "bottom" },
      );
    }
    if (import.meta.env.DEV) {
      document.getElementById("ifr")?.remove();
      const iframe = document.createElement("iframe");
      iframe.setAttribute("id", "ifr");
      iframe.setAttribute(
        "style",
        "position:fixed;right:0; top:0; bottom:0; height:100%; width:500px",
      );
      document.body.appendChild(iframe);
      iframe.src = pdf.output("datauristring");
    } else {
      pdf.save(makePdfName());
    }
  };
  const closePdf = async () => {
    document.getElementById("ifr")?.remove();
  };

  const roundsMemo = createMemo(() =>
    Object.entries(dataS().rounds)
      .filter(([, sizes]) => !!Object.values(sizes).length)
      .sort(
        ([a], [b]) =>
          ROUNDS_TABLE_ORDER.indexOf(a as PostVariant) -
          ROUNDS_TABLE_ORDER.indexOf(b as PostVariant),
      )
      .map(([variant, data]) => ({
        variant,
        data: data.sort((a, b) =>
          a.length === b.length
            ? Number(String(a.diameter).split("-")[0]) -
              Number(String(b.diameter).split("-")[0])
            : a.length - b.length,
        ),
      })),
  );
  const sawnMemo = createMemo(() =>
    Object.entries(dataS().sawn)
      .filter(([, sizes]) => !!Object.values(sizes).length)
      .sort(
        ([a], [b]) =>
          SAWN_TABLE_ORDER.indexOf(a as SawnVariant) -
          SAWN_TABLE_ORDER.indexOf(b as SawnVariant),
      ),
  );

  createEffect(() => {
    console.log({ roundsMemo: roundsMemo() });
  });

  return (
    <>
      {/* <div
        id="cover"
        style={{
          width: "595.28px",
          height: "741.89px",
        }}
        class="flex flex-col items-center justify-center gap-6"
      >
        <div class="flex flex-col items-center justify-center gap-3">
          <Logo width={128} /> 
          <img style="width:256px; height:256px;" src="/Logo.png" alt="" />
          <div class="flex flex-col items-center justify-center">
            <h1 class="font-roboto text-3xl">Minorba Pine Products</h1>
            <p class="font-roboto">Trading as Minorba Grazing Co.</p>{" "}
          </div>
          <div class="flex flex-col items-center justify-center">
            <div class="font-roboto text-2xl">
              {ogDataS() === "retail" ? "Retail" : "Wholesale"} Price List
            </div>
            <div class="font-roboto">
              Prices effective from September 1st 2024
            </div>
          </div>
        </div>

        <div class="flex flex-col items-center justify-center">
          <div class="font-roboto text-xl">
            Mon - Thur: 8am - 5pm. Fri: 8am - 3pm
          </div>
          <div class="font-roboto">Phone: 08 9953 2138</div>
          <div class="font-roboto">Email: minorba1@bigpond.com</div>
          <div class="font-roboto">Norman Mobile: 0419 939 423</div>
          <div class="font-roboto">Michael Mobile: 0419 942 319</div>
        </div>
      </div>
      <div
        id="secPage"
        style={{
          width: "595.28px",
          height: "741.89px",
        }}
        class="flex flex-col items-center justify-center gap-6"
      >
        {(ogDataS() === "retail" ? retailCoverInfo : wholesaleCoverInfo).map(
          (info, key) => (
            <div>
              <div class="font-roboto">{info.header}</div>
              <div class="font-roboto">{info.body}</div>
            </div>
          ),
        )}
      </div> */}
      <div>
        <select
          value={ogDataS()}
          onChange={(e) => setOgData(e.currentTarget.value)}
        >
          {pricelistDataKeys.map((x, i) => (
            <option value={x}>{x}</option>
          ))}
        </select>
        <button
          //   intent="primary"
          onClick={() => makePdf(ogDataS() !== "retail")}
        >
          Make PDF
        </button>
        <button onClick={closePdf}>Close PDF</button>
      </div>
      <For each={roundsMemo()}>
        {(data) => (
          <PostTable variant={data.variant as PostVariant} sizes={data.data} />
        )}
      </For>
      {/* <For each={roundsMemo()}>
        {([variant, sizes]) => (
          <div class="p-8">
            <table class={`${TABLE_ID} border-0`} style="width: 100%">
              <thead class="bg-surface-container sticky top-0 h-8 border-0">
                <tr class="h-10 break-inside-avoid border-0">
                  <th
                    class="border-0 border-none bg-white p-0 text-left text-2xl"
                    colSpan={7}
                  >
                    {PostVariantLables[variant as PostVariant]}
                  </th>
                </tr>
                <Show when={PostVariantDescriptions[variant as PostVariant]}>
                  <tr class="h-10 break-inside-avoid border-0">
                    <th
                      class="border-0 border-none bg-white p-0 text-left font-normal"
                      colSpan={7}
                    >
                      {PostVariantDescriptions[variant as PostVariant]}
                    </th>
                  </tr>
                </Show>
                <tr class="h-14">
                  <th class="text-right">Diameter (mm)</th>
                  <th class="text-right">Grade</th>
                  <th class="text-left">Code</th>
                  <th class="text-right">Posts / Pack</th>
                  <th class="text-right">Post Cost ($)</th>
                  <th class="text-right">Pack Cost ($)</th>
                  <th class="text-right">Weight (kg)</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(sizes)
                  .sort(([a], [b]) => parseFloat(a) - parseFloat(b))
                  .map(([length, sizes]) => (
                    <>
                      <tr class="break-inside-avoid">
                        <th
                          class="bg-surface-container border-surface-container-highest sticky top-24 break-inside-avoid border"
                          colSpan={7}
                        >
                          {Number(length).toPrecision(2)} m
                        </th>
                      </tr>
                      <For each={sizes}>
                        {(size) => (
                          <tr>
                            <td class="text-right">{size.diameter}</td>
                            <td class="text-right">{size.grade}</td>
                            <td class="text-left text-sm">{size.code}</td>
                            <td class="text-right">{size.postPerPack}</td>
                            <td class="text-right">{size.postPrice}</td>
                            <td class="text-right">{size.packPrice}</td>
                            <td class="text-right">{size.weight}</td>
                          </tr>
                        )}
                      </For>
                    </>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </For>

      <For each={sawnMemo()}>
        {([variant, sizes], i) => (
          <div class="p-8">
            <table
              class={`${TABLE_ID} border-0`}
              classList={{
                "break-before-page": i() === 0,
              }}
              style="width: 100%"
            >
              <thead class="bg-surface-container sticky top-0 h-8 border-0">
                <tr class="h-10 break-inside-avoid border-0">
                  <th
                    class="border-0 border-none bg-white p-0 text-left text-2xl"
                    colSpan={
                      LENGTH_IN_TABLE.includes(variant as SawnVariant) ? 7 : 6
                    }
                  >
                    {SawnVariantLables[variant as SawnVariant]}
                  </th>
                </tr>
                {SawnVariantDescriptions[variant as SawnVariant] && (
                  <tr class="h-10 break-inside-avoid border-0">
                    <th
                      class="border-0 border-none bg-white p-0 text-left font-normal"
                      colSpan={7}
                    >
                      {SawnVariantDescriptions[variant as SawnVariant]}
                    </th>
                  </tr>
                )}
                <tr class="h-14">
                  <Show when={LENGTH_IN_TABLE.includes(variant as SawnVariant)}>
                    <th class="text-right">
                      Length
                      <br />
                      (m)
                    </th>
                  </Show>

                  <th class="text-right">
                    Dimensions
                    <br />
                    (mm)
                  </th>
                  <th class="text-left">Code</th>
                  <th class="text-right">Posts / Pack</th>
                  <th class="text-right">Post Cost ($)</th>
                  <th class="text-right">Pack Cost ($)</th>
                  <th class="text-right">Weight (kg)</th>
                </tr>
              </thead>
              <tbody>
                <For
                  each={Object.entries(sizes).sort(
                    ([a], [b]) => parseFloat(a) - parseFloat(b),
                  )}
                >
                  {([length, sizes]) => (
                    <>
                      <Show
                        when={!LENGTH_IN_TABLE.includes(variant as SawnVariant)}
                      >
                        <tr class="break-inside-avoid">
                          <th
                            class="bg-surface-container border-surface-container-highest sticky top-24 break-inside-avoid border"
                            colSpan={7}
                          >
                            {Number(length).toPrecision(2)} m
                          </th>
                        </tr>
                      </Show>
                      <For each={sizes}>
                        {(size, idx) => (
                          <tr>
                            <Show
                              when={LENGTH_IN_TABLE.includes(
                                variant as SawnVariant,
                              )}
                            >
                              <td class="text-right">
                                {Number(size.length).toFixed(1)}
                              </td>
                            </Show>

                            <td class="text-right">
                              {size.dimensions.join(" x ")}
                            </td>
                            <td class="text-left text-sm">{size.code}</td>
                            <td class="text-right">{size.postPerPack}</td>
                            <td class="text-right">{size.postPrice}</td>
                            <td class="text-right">{size.packPrice}</td>
                            <td class="text-right">{size.weight}</td>
                          </tr>
                        )}
                      </For>
                    </>
                  )}
                </For>
              </tbody>
            </table>
          </div>
        )}
      </For> */}
    </>
  );
};

type TableProps = {
  variant: PostVariant;
  sizes: FinalConfig[];
};

const PostTable: Component<TableProps> = (props) => {
  const table = createSolidTable({
    get data() {
      return props.sizes;
    },
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <table>
      <thead>
        <For each={table.getHeaderGroups()}>
          {(headerGroup) => (
            <tr>
              <For each={headerGroup.headers}>
                {(header) => (
                  <th>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                )}
              </For>
            </tr>
          )}
        </For>
      </thead>
      <tbody>
        <For each={table.getRowModel().rows}>
          {(row) => {
            console.log({ row });
            return (
              <>
                <tr>
                  <For each={row.getVisibleCells()}>
                    {(cell) => (
                      <td>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    )}
                  </For>
                </tr>
              </>
            );
          }}
        </For>
      </tbody>
    </table>
  );
};
