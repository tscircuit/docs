import { assembly } from "@tscircuit/core"

export default () => (
  <assembly.device name="controller">
    <board name="carrier" width="80mm" height="50mm" thickness="1.6mm">
      <hole name="H1" diameter="3.2mm" pcbX={-35} pcbY={-20} />
      <hole name="H2" diameter="3.2mm" pcbX={35} pcbY={-20} />
      <hole name="H3" diameter="3.2mm" pcbX={35} pcbY={20} />
      <hole name="H4" diameter="3.2mm" pcbX={-35} pcbY={20} />
    </board>
    <assembly.drawing.page name="carrier-inspection" size="iso_a4">
      <assembly.drawing.partview
        partRef=".carrier"
        name="plan"
        displayName="PLAN"
        direction="z+"
        width="110mm"
        height="85mm"
        centerX="-70mm"
        centerY="30mm"
      />
      <assembly.drawing.partview
        partRef=".carrier"
        name="overview"
        displayName="ISOMETRIC"
        direction="isometric"
        width="110mm"
        height="85mm"
        rightOfRef=".plan"
        centerY="30mm"
      />
      <assembly.drawing.titleblock
        title="CONTROLLER CARRIER - INSPECTION"
        identificationNumber="CTRL-CARRIER-001"
        revisionIndex="A"
        legalOwner="tscircuit"
        creator="tscircuit"
        approvalPerson="PRELIMINARY"
        sheetNumber={1}
        numberOfSheets={2}
      />
    </assembly.drawing.page>
    <assembly.drawing.page name="carrier-section" size="iso_a4">
      <assembly.drawing.partview
        partRef=".carrier"
        name="section"
        displayName="SECTION THROUGH H3 AND H4"
        direction="y+"
        width="220mm"
        height="65mm"
        centerY="25mm"
        section={{
          axis: "y",
          offset: "20mm",
          keepSide: "less",
          hatchSpacing: "1mm",
        }}
      />
      <assembly.drawing.titleblock
        title="CONTROLLER CARRIER - MOUNTING HOLE SECTION"
        identificationNumber="CTRL-CARRIER-002"
        revisionIndex="A"
        legalOwner="tscircuit"
        creator="tscircuit"
        approvalPerson="PRELIMINARY"
        sheetNumber={2}
        numberOfSheets={2}
      />
    </assembly.drawing.page>
  </assembly.device>
)
