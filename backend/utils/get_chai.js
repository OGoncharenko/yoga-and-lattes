let chai_obj = null;

const get_chai = async () => {
  if (!chai_obj) {
    const { expect, use } = await import("chai");
    const {default: chaiHttp} = await import("chai-http");
    const chai = use(chaiHttp);
    chai_obj = { expect, request: chai.request };
  }
  return chai_obj;
};

export default get_chai;