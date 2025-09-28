"use client";
import { GOLD_NISAAB, SILVER_NISAAB } from "@/app/constants/static-data";
import React, { useEffect, useState } from "react";

export function ZakatCalculator() {
  const [goldPrice, setGoldPrice] = useState(0);
  const [silverPrice, setSilverPrice] = useState(0);
  const [nisaab, setNisaab] = useState(0);
  const [error, setError] = useState("");

  const [inputs, setInputs] = useState<
    { amount: number; date: string; id: number }[]
  >([{ amount: 0, date: "", id: 1 }]);

  const YEAR = 365 * 24 * 60 * 60;

  const [amount, setAmount] = useState(0);

  const addInput = () => {
    setInputs((prev) => [
      ...prev,
      { amount: 0, date: "", id: prev.length + 1 },
    ]);
  };

  const updateInput = (index: number, value: number, date: string) => {
    const newInputs = [...inputs];
    newInputs[index] = {
      amount: value,
      date: date,
      id: newInputs[index].id,
    };
    setInputs(newInputs);
  };

  useEffect(() => {
    if (goldPrice) {
      setNisaab(goldPrice * GOLD_NISAAB);
    } else {
      setNisaab(silverPrice * SILVER_NISAAB);
    }
  }, [goldPrice, silverPrice, inputs]);

  function calculateZakat() {
    setError("");
    setAmount(0);
    if (goldPrice) {
      setNisaab(goldPrice * GOLD_NISAAB);
    } else {
      setNisaab(silverPrice * SILVER_NISAAB);
    }

    if (nisaab === 0) {
      setError("Please enter the local gold or silver price in your country");
      return;
    }

    let noDate = false;
    let noAmount = false;

    inputs.forEach((input) => {
      const timeSpan = new Date().getTime() - new Date(input.date).getTime();
      if (input.amount >= nisaab && timeSpan > YEAR) {
        setAmount((prev) => prev + Number(input.amount) * 0.025);
        if (!input.date) {
          noDate = true;
        }
        if (!input.amount) {
          noAmount = true;
        }
      }
    });

    if (noDate) {
      setError("Please enter the date of the purchase");
      return;
    }
    if (noAmount) {
      setError("Please enter the amount of the purchase");
      return;
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 justify-center">
        <div className="opacity-0">1.</div>
        <div className="flex flex-col gap-2 w-1/2 md:w-64">
          <label className="text-sm md:text-base" htmlFor="goldPrice">
            Local Gold Price(1gm)
          </label>
          <input
            type="number"
            value={goldPrice == 0 ? "" : goldPrice}
            disabled={silverPrice !== 0}
            className={`w-full border border-gray-300 rounded-md p-2 ${
              silverPrice !== 0 ? "opacity-50 text-muted-foreground" : ""
            }`}
            onChange={(e) => {
              setGoldPrice(Number(e.target.value));
              setError("");
            }}
            placeholder={`Gold Price`}
          />
        </div>
        <div className="flex flex-col gap-2 w-1/2 md:w-64">
          <label className="text-sm md:text-base" htmlFor="silverPrice">
            Local Silver Price (1gm)
          </label>
          <input
            type="number"
            value={silverPrice == 0 ? "" : silverPrice}
            disabled={goldPrice !== 0}
            className={`w-full border border-gray-300 rounded-md p-2 ${
              goldPrice !== 0 ? "opacity-50 text-muted-foreground" : ""
            }`}
            onChange={(e) => {
              setSilverPrice(Number(e.target.value));
              setError("");
            }}
            placeholder={`Silver Price`}
          />
        </div>
      </div>
      {inputs.map((value, index) => (
        <div className="flex gap-2 items-center" key={value.id}>
          <label htmlFor={`amount-${value.id}`}>{value.id}.</label>
          <input
            type="number"
            value={value.amount == 0 ? "" : value.amount}
            className="w-1/2 md:w-64 border border-gray-300 rounded-md p-2"
            onChange={(e) => {
              updateInput(index, Number(e.target.value), value.date);
              setError("");
            }}
            placeholder={`Amount ${index + 1}`}
          />
          <input
            type="date"
            className="w-1/2 md:w-64 border border-gray-300 rounded-md p-2"
            onChange={(e) => {
              updateInput(index, value.amount, e.target.value);
              setError("");
            }}
          />
        </div>
      ))}
      <div className="text-center">Amount: {amount}</div>
      <div className="flex gap-2 justify-center">
        <button
          className="w-fit px-4 cursor-pointer bg-emerald-200 text-emerald-900  rounded-md p-2"
          onClick={calculateZakat}
        >
          Calculate
        </button>
        <button
          className="w-fit px-4 cursor-pointer bg-amber-200 text-amber-900  rounded-md p-2"
          onClick={addInput}
        >
          Add Field
        </button>
      </div>
      {error && (
        <div className="text-center w-1/2 md:w-64 mx-auto text-red-500 text-sm md:text-base">
          {error}
        </div>
      )}
    </div>
  );
}
