import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "./hello_world.did.js";
export { idlFactory } from "./hello_world.did.js";

// Reemplaza este valor con tu variable de entorno real
export const canisterId = "bkyz2-fmaaa-aaaaa-qaaaq-cai";

export const createActor = async (canisterId, options = {}) => {
  // Crear el agente usando HttpAgent.create()
  const agent = options.agent || await HttpAgent.create({ ...options.agentOptions });

  if (options.agent && options.agentOptions) {
    console.warn(
      "Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent."
    );
  }

  // Definir el entorno de trabajo
  const network = "local"; // Cambiar a "ic" cuando estés en producción

  // // Fetch root key for certificate validation during development
  // if (network !== "ic") {
  //   agent.fetchRootKey().catch((err) => {
  //     console.warn(
  //       "Unable to fetch root key. Check to ensure that your local replica is running"
  //     );
  //     console.error(err);
  //   });
  // }

  // Creates an actor using the candid interface and the HttpAgent
  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options.actorOptions,
  });
};