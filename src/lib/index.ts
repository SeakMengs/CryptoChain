import elliptic from "elliptic";

const { ec: EC } = elliptic;

export const ec = new EC("secp256k1");
