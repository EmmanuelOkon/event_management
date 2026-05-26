import Search from "@/components/shared/Search";
import { getOrdersByEvent } from "@/lib/actions/order.actions";
import { IOrderItem } from "@/lib/database/models/order.model";
import { formatDateTime, formatPrice } from "@/lib/utils";
import { SearchParamProps } from "@/types";

const Orders = async ({ searchParams }: SearchParamProps) => {
  const resolvedSearchParams = await searchParams;
  const eventId = (resolvedSearchParams?.eventId as string) || "";
  const searchText = (resolvedSearchParams?.query as string) || "";

  const orders = await getOrdersByEvent({ eventId, searchString: searchText });

  return (
    <>
      <section className=" bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper mx-auto max-w-6xl px-6">
          <h1 className="text-4xl font-display font-semibold tracking-tight text-balance ">
            Orders
          </h1>
          <p className="mt-3 text-zinc-600 max-w-xl">
            View and manage ticket orders for your event. Search by buyer name,
            to quickly find specific orders and keep track of your attendees.
          </p>
        </div>
      </section>

      <section className="wrapper mt-8 mx-auto max-w-6xl px-6">
        <Search placeholder="Search buyer name..." />
      </section>

      <section className="wrapper overflow-x-auto my-2 mx-auto max-w-6xl px-6">
        <table className="w-full border-collapse border-t">
          <thead>
            <tr className="p-medium-14 border-b text-grey-500">
              <th className="min-w-[250px] py-3 text-left font-sans font-bold ">
                Order ID
              </th>
              <th className="min-w-[200px] flex-1 py-3 pr-4 text-left font-sans font-bold">
                Event Title
              </th>
              <th className="min-w-[150px] py-3 text-left font-sans font-bold">
                Buyer
              </th>
              <th className="min-w-[100px] py-3 text-left font-sans font-bold">Created</th>
              <th className="min-w-[100px] py-3 text-right font-sans font-bold">Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.length === 0 ? (
              <tr className="border-b">
                <td colSpan={5} className="py-4 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            ) : (
              <>
                {orders &&
                  orders.map((row: IOrderItem) => (
                    <tr
                      key={row._id}
                      className="p-regular-14 lg:p-regular-16 border-b "
                      style={{ boxSizing: "border-box" }}
                    >
                      <td className="min-w-[250px] py-4 text-primary-500">
                        {row._id}
                      </td>
                      <td className="min-w-[200px] flex-1 py-4 pr-4">
                        {row.eventTitle}
                      </td>
                      <td className="min-w-[150px] py-4">{row.buyer}</td>
                      <td className="min-w-[100px] py-4">
                        {formatDateTime(row.createdAt).dateTime}
                      </td>
                      <td className="min-w-[100px] py-4 text-right">
                        {formatPrice(row.totalAmount)}
                      </td>
                    </tr>
                  ))}
              </>
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Orders;
