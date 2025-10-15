import Layout from "../components/Layout";
import {
  getFirestore,
  doc,
  writeBatch,
  runTransaction,
} from "firebase/firestore";

import { useState } from "react";
import { app } from "../config/firebaseConfig";
import { BsDatabase } from "react-icons/bs";
import { MdQrCode2 } from "react-icons/md";
import { FiZap } from "react-icons/fi";
import { GiSparkles } from "react-icons/gi";
import { RiLoader2Fill } from "react-icons/ri";
import { BiCheckCircle, BiXCircle } from "react-icons/bi";

function AboutPage() {
  const db = getFirestore(app);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [activeOperation, setActiveOperation] = useState<
    "batch" | "transaction" | null
  >(null);

  const save = async () => {
    setLoading(true);
    setResult(null);
    setActiveOperation("batch");

    try {
      const firebaseCourseRef = doc(db, "courses", "JVXlcA6ph98c7Vg2nc4E");
      const rxjsCourseRef = doc(db, "courses", "MsU0Mz7pNSbnhzYSkt9y");

      const batch = writeBatch(db);
      batch.update(firebaseCourseRef, {
        titles: { description: "Firebase Course" },
      });
      batch.update(rxjsCourseRef, {
        titles: { description: "RxJs Course" },
      });

      await batch.commit();
      setResult("Batch update successful ✅");
    } catch (err) {
      console.error(err);
      setResult("Batch update failed ❌");
    } finally {
      setLoading(false);
    }
  };
  const isSuccess = result?.includes("✅");
  const isError = result?.includes("❌");

  const runTransactionExample = async () => {
    setLoading(true);
    setResult(null);
    setActiveOperation("transaction");

    try {
      const resultCount = await runTransaction(db, async (transaction) => {
        console.log("Running transaction...");

        const courseRef = doc(db, "courses", "JVXlcA6ph98c7Vg2nc4E");
        const snap = await transaction.get(courseRef);

        if (!snap.exists()) throw new Error("Course not found");

        const courseData = snap.data() as { lessonsCount: number };
        const newCount = (courseData.lessonsCount || 0) + 1;

        transaction.update(courseRef, { lessonsCount: newCount });

        return newCount;
      });

      setResult(`Transaction complete ✅ New lessons count = ${resultCount}`);
      console.log("result lessons count =", resultCount);
    } catch (err) {
      console.error(err);
      setResult("Transaction failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-red-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-gradient-to-r from-orange-400 to-red-400 rounded-full blur-3xl opacity-20 -z-10" />

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg mb-6">
              <BsDatabase className="w-5 h-5 text-orange-600" />
              <span className="text-sm font-semibold text-gray-700">
                Firebase Integration
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
              React with Firebase
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Master Firebase operations with batch updates and transactions
            </p>
          </div>

          {/* Operations Section */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center">
                <GiSparkles className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Firebase Operations
              </h2>
            </div>

            {/* Operation Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Batch Update Card */}
              <div
                className={`relative group bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 transition-all duration-300 ${
                  activeOperation === "batch"
                    ? "border-blue-500 shadow-xl scale-105"
                    : "border-blue-200 hover:border-blue-400 hover:shadow-lg"
                }`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      activeOperation === "batch"
                        ? "bg-blue-600 shadow-lg scale-110"
                        : "bg-blue-500"
                    }`}
                  >
                    <BsDatabase className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2">
                      Batch Update
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Update multiple documents atomically in a single operation
                    </p>
                  </div>
                </div>

                <button
                  onClick={save}
                  disabled={loading}
                  className="w-full group/btn bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {loading && activeOperation === "batch" ? (
                    <>
                      <RiLoader2Fill className="w-5 h-5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <MdQrCode2 className="w-5 h-5" />
                      <span>Run Batch Update</span>
                    </>
                  )}
                </button>
              </div>

              {/* Transaction Card */}
              <div
                className={`relative group bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 transition-all duration-300 ${
                  activeOperation === "transaction"
                    ? "border-green-500 shadow-xl scale-105"
                    : "border-green-200 hover:border-green-400 hover:shadow-lg"
                }`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      activeOperation === "transaction"
                        ? "bg-green-600 shadow-lg scale-110"
                        : "bg-green-500"
                    }`}
                  >
                    <FiZap className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2">
                      Transaction
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Execute read-modify-write operations with data consistency
                    </p>
                  </div>
                </div>

                <button
                  onClick={runTransactionExample}
                  disabled={loading}
                  className="w-full group/btn bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {loading && activeOperation === "transaction" ? (
                    <>
                      <RiLoader2Fill className="w-5 h-5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <FiZap className="w-5 h-5" />
                      <span>Run Transaction</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Result Display */}
            {result && (
              <div
                className={`relative overflow-hidden rounded-2xl p-6 border-2 animate-in fade-in slide-in-from-bottom-4 duration-500 ${
                  isSuccess
                    ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-300"
                    : isError
                    ? "bg-gradient-to-br from-red-50 to-rose-50 border-red-300"
                    : "bg-gradient-to-br from-gray-50 to-slate-50 border-gray-300"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                      isSuccess
                        ? "bg-green-500"
                        : isError
                        ? "bg-red-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {isSuccess ? (
                      <BiCheckCircle className="w-6 h-6 text-white" />
                    ) : isError ? (
                      <BiXCircle className="w-6 h-6 text-white" />
                    ) : (
                      <BsDatabase className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`font-semibold mb-1 ${
                        isSuccess
                          ? "text-green-900"
                          : isError
                          ? "text-red-900"
                          : "text-gray-900"
                      }`}
                    >
                      {isSuccess ? "Success" : isError ? "Error" : "Result"}
                    </h3>
                    <p
                      className={`text-sm ${
                        isSuccess
                          ? "text-green-700"
                          : isError
                          ? "text-red-700"
                          : "text-gray-700"
                      }`}
                    >
                      {result}
                    </p>
                  </div>
                </div>

                {/* Animated background effect */}
                <div
                  className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-20 ${
                    isSuccess
                      ? "bg-green-400"
                      : isError
                      ? "bg-red-400"
                      : "bg-gray-400"
                  }`}
                />
              </div>
            )}
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4">
                <BsDatabase className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Cloud Firestore</h3>
              <p className="text-sm text-gray-600">
                NoSQL database with real-time synchronization
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4">
                <MdQrCode2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Batch Operations</h3>
              <p className="text-sm text-gray-600">
                Execute multiple writes as a single atomic unit
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                <FiZap className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Transactions</h3>
              <p className="text-sm text-gray-600">
                Ensure data consistency with atomic read-write operations
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AboutPage;
