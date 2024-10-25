import NotFoundImg from "../../../assets/images/404.png";
function NotFound() {
  return (
    <section className="w-full h-full bg-black text-white flex flex-col items-center justify-center space-y-24">
      <img className="w-[300px]" src={NotFoundImg} alt="" />

      <div className="flex flex-col items-center gap-3">
        <h1 className="text-xl font-bold uppercase">
          the page you were looking for does not exist
        </h1>
        <p className="uppercase">you may have mistyped the address or the page may have moved</p>
      </div>
    </section>
  );
}

export default NotFound;
