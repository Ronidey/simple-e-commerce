import { useNavigate, useParams } from "react-router";
import { useAppContext } from "../../store/AppContext";
import Rating from "../../components/ui/Rating";
import UserReview from "../../components/ui/UserReview";
import { useEffect, useState } from "react";
import { fetchProductById } from "../../services/productService";
import Skeleton from "../../components/ui/Skeleton";

export default function ProductDetails() {
  const { appState } = useAppContext();
  const productId = Number(useParams<{ id: string }>().id);
  const navigate = useNavigate();

  const existingData = appState.products.data.find(
    (item) => item.id === productId,
  );

  const [{ loading: isLoading, data: productsData }, setProductData] = useState(
    {
      loading: !existingData,
      data: existingData || null,
    },
  );

  useEffect(() => {
    if (!existingData) {
      (async () => {
        try {
          const res = await fetchProductById(productId);

          setProductData({ loading: false, data: res });
        } catch (err) {
          console.log(err);
          setProductData({ loading: false, data: null });
        }
      })();
    }
  }, [productId, existingData]);

  return (
    <div className="relative h-full">
      {isLoading ? (
        <div className="w-full max-w-5xl mx-auto h-full flex flex-col md:flex-row p-6 gap-8">
          <div className="w-full max-w-sm mx-auto h-1/3 md:h-2/3">
            <Skeleton className="w-full h-full" />
          </div>
          <div className="flex-1">
            <Skeleton width="100%" height="100%" />
          </div>
        </div>
      ) : productsData ? (
        <>
          <button
            className="absolute top-4 left-4 bg-white px-4 py-1.5 rounded border border-gray-200 text-sm"
            onClick={() => navigate(-1)}
          >
            &#8592; Back
          </button>
          <div className="w-full max-w-5xl mx-auto h-full flex flex-col md:flex-row p-6">
            <div className="flex-1">
              <img
                src={productsData.images[0]}
                alt={productsData.title}
                className="w-full max-w-sm lg:max-w-md mx-auto"
              />
            </div>

            <div className="flex-1 md:border-l border-gray-200 md:pl-6">
              <div>
                <h2 className="text-2xl mb-4">{productsData.title}</h2>

                <div className="flex items-center mb-4">
                  <div className="text-2xl font-medium">
                    &#36;{productsData.price}
                  </div>
                  <div className="ml-4">
                    <Rating rating={productsData.rating} size="sm" />
                  </div>
                </div>

                <ul className="text-sm space-y-1">
                  <li>
                    <span className="font-medium">Brand: </span>
                    <span className="text-gray-700">{productsData.brand}</span>
                  </li>
                  <li>
                    <span className="font-medium">Category: </span>
                    <span className="text-gray-700 capitalize">
                      {productsData.category}
                    </span>
                  </li>
                </ul>
              </div>

              <hr className="border-gray-200 my-6" />

              <div>
                <h3 className="text-lg font-medium mb-2">Description</h3>
                <p className="text-sm text-gray-700">
                  {productsData.description}
                </p>
              </div>

              <hr className="border-gray-200 my-6" />

              <div>
                <h3 className="text-lg mb-4 font-semibold">Reviews</h3>
                {productsData.reviews.map((item, idx) => (
                  <div key={idx} className="mb-4">
                    <UserReview {...item} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-full flex justify-center items-center text-2xl font-semibold">
          No data found!
        </div>
      )}
    </div>
  );
}
