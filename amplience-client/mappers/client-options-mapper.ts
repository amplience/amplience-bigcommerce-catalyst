/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AmplienceClientOptions {
  hubName?: string;
  locale?: string;
  stagingEnvironment?: string;
}

export const clientOptionsMapper = ({
  hubName,
  locale,
  stagingEnvironment,
}: Record<string, any>): AmplienceClientOptions => {
  return {
    hubName,
    locale,
    stagingEnvironment,
  };
};
