"use client";
import {
  calculateArea,
  changeShape,
  increaseArea,
} from "@/redux/reducerSlice/boxSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const { width, height, backgroundColor, borderRadius, area } = useSelector(
    (state: any) => state.box
  );
  const dispatch = useDispatch();
  return (
    <div className="w-screen h-screen gap-2 flex flex-col justify-center items-center">
      <div
        onClick={() => dispatch(changeShape())}
        style={{ width, height, backgroundColor, borderRadius }}
        className="cursor-pointer"
      ></div>
      <p>Area = {area}</p>
      <button
        onClick={() => dispatch(increaseArea())}
        className="bg-black text-white py-1 px-2 rounded-md"
      >
        Increase size
      </button>
      <button onClick={() => dispatch(calculateArea())}>Calculate Area</button>
    </div>
  );
}
