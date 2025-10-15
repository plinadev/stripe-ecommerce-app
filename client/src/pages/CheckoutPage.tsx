import { useEffect, useState } from "react";
import {
  HiCheckCircle,
  HiXCircle,
  HiShoppingCart,
  HiArrowRight,
  HiHome,
} from "react-icons/hi";
import { useNavigate } from "react-router-dom";

function CheckoutPage() {
  const [purchaseResult, setPurchaseResult] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const result = params.get("purchaseResult");
    setPurchaseResult(result);
  }, []);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  if (purchaseResult === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center px-4 py-12">
        {/* Animated background circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 right-20 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-64 h-64 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-2xl w-full">
          {/* Success Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Success Icon Section */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 px-8 py-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-white opacity-10">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                    backgroundSize: "32px 32px",
                  }}
                ></div>
              </div>

              <div className="relative">
                {/* Animated checkmark */}
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-scale-in">
                  <HiCheckCircle className="w-16 h-16 text-green-500" />
                </div>

                <h1 className="text-4xl font-bold text-white mb-3">
                  Payment Successful!
                </h1>
                <p className="text-green-50 text-lg">
                  Your order has been confirmed
                </p>
              </div>
            </div>

            {/* Content Section */}
            <div className="px-8 py-10">
              <div className="text-center mb-8">
                <p className="text-gray-600 text-lg mb-2">
                  Thank you for your purchase!
                </p>
                <p className="text-gray-500">
                  A confirmation email has been sent to your inbox with all the
                  details.
                </p>
              </div>

              {/* Order Details Box */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 mb-8 border border-green-100">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <HiShoppingCart className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      What's Next?
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                        Check your email for order confirmation
                      </li>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                        Access your purchased courses immediately
                      </li>
                      <li className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                        Start learning at your own pace
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => handleNavigate("/")}
                  className="w-full bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 flex items-center justify-center space-x-2 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <HiHome className="w-5 h-5" />
                  <span>Back to Home</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
          @keyframes scale-in {
            0% { transform: scale(0); opacity: 0; }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); opacity: 1; }
          }
          .animate-scale-in {
            animation: scale-in 0.5s ease-out;
          }
        `}</style>
      </div>
    );
  }

  if (purchaseResult === "failure") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 flex items-center justify-center px-4 py-12">
        {/* Animated background circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-64 h-64 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 right-20 w-64 h-64 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-2xl w-full">
          {/* Error Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Error Icon Section */}
            <div className="bg-gradient-to-br from-red-500 to-rose-600 px-8 py-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-white opacity-10">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                    backgroundSize: "32px 32px",
                  }}
                ></div>
              </div>

              <div className="relative">
                {/* Animated X icon */}
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-scale-in">
                  <HiXCircle className="w-16 h-16 text-red-500" />
                </div>

                <h1 className="text-4xl font-bold text-white mb-3">
                  Payment Failed
                </h1>
                <p className="text-red-50 text-lg">
                  We couldn't process your payment
                </p>
              </div>
            </div>

            {/* Content Section */}
            <div className="px-8 py-10">
              <div className="text-center mb-8">
                <p className="text-gray-600 text-lg mb-2">
                  Don't worry, no charges were made.
                </p>
                <p className="text-gray-500">
                  Your order was not completed. Please try again or contact
                  support if the issue persists.
                </p>
              </div>

              {/* Common Reasons Box */}
              <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-6 mb-8 border border-red-100">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-red-600 font-bold">?</span>
                  </div>
                  Common Reasons for Payment Failure
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2 mt-1.5 flex-shrink-0"></div>
                    <span>Insufficient funds or credit limit reached</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2 mt-1.5 flex-shrink-0"></div>
                    <span>Incorrect card details or billing address</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2 mt-1.5 flex-shrink-0"></div>
                    <span>Card expired or blocked by your bank</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2 mt-1.5 flex-shrink-0"></div>
                    <span>Network or connection issues</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => handleNavigate("/")}
                  className="w-full bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 flex items-center justify-center space-x-2 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <HiHome className="w-5 h-5" />
                  <span>Back to Home</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
          @keyframes scale-in {
            0% { transform: scale(0); opacity: 0; }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); opacity: 1; }
          }
          .animate-scale-in {
            animation: scale-in 0.5s ease-out;
          }
        `}</style>
      </div>
    );
  }

  // Default state (no query param or invalid value)
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-3xl shadow-xl p-10">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <HiShoppingCart className="w-10 h-10 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Checkout</h1>
          <p className="text-gray-600 mb-8">Processing your order...</p>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
