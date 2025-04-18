import { Tabs } from "@chakra-ui/react"
import { JSX } from "@emotion/react/jsx-runtime";
import { HexEditor } from "hex-editor-react"
import "hex-editor-react/dist/hex-editor.css";
import init, { Ledger } from "amaru-js"
import { useEffect, useState } from "react"
import { Provider } from "@/components/ui/provider"

export function BlockViewer({data, onChange}: { data: string, onChange: (data: string) => void }): JSX.Element {
  const [ledger, setLedger] = useState<Ledger | null>(null);

  useEffect(() => {
    init().then(() => {
      class Storage {
      }
      setLedger(new Ledger(new Storage()));
      console.log("Ledger initialized", ledger);
    })
  }, []);

  return (
    <Provider>
    <Tabs.Root defaultValue="hex">
      <Tabs.List>
        <Tabs.Trigger value="raw">
          Raw
        </Tabs.Trigger>
        <Tabs.Trigger value="hex">
          Hex
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="raw"><textarea id="raw-block" value={data} onChange={(e) => onChange(e.target.value)} /></Tabs.Content>
      <Tabs.Content value="hex"><HexEditor data={new TextEncoder().encode(data)}></HexEditor></Tabs.Content>
    </Tabs.Root>
    </Provider>
  );
}