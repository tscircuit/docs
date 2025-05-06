---
title: Build a Sparkfun Module
sidebar_position: 5
---

# Build a Sparkfun Module Program

tscircuit offers up to $150 for accurately replicating Sparkfun modules in tscircuit. This program helps expand our component library while providing learning opportunities for contributors.

Building a sparkfun module is a great way to find friction, bugs and understand the tscircuit
tools and ecosystem better. If you're looking to contribute to tscircuit, it's a great first
step.

## Program Steps

**Create Implementation Issue**
Create an issue in the [tscircuit/tscircuit](https://github.com/tscircuit/tscircuit) repository
Use the template below for your issue
Get maintainer approval before proceeding with implementation

Here's the issue template to use:

```markdown
---
title: "Sparkfun Module Replication: [MODULE_NAME]"
labels: sparkfun-module
---

## Module Information

**Original Module**: [LINK_TO_SPARKFUN_MODULE]
**Description**: Brief description of the module's function

## Implementation Plan

[ ] Get maintainer approval to proceed
[ ] Components identified and sourced
[ ] Schematic created matching Sparkfun documentation
[ ] Board dimensions and layer stackup matched
[ ] Footprints implemented correctly
[ ] Trace routing completed
[ ] Silkscreen text and markings added
[ ] Test circuit created
[ ] Documentation completed
[ ] Gerber files generated and verified

## Additional Notes

Any special considerations or challenges you foresee?

## Screenshots

Add screenshot of original Sparkfun module
```

**Implementation Requirements**
Create precise schematic matching Sparkfun's documentation
Include all component footprints
Match board dimensions exactly
Implement correct trace routing
Add silkscreen text and markings
Document all external dependencies

**Testing & Verification**
Generate Gerber files
Compare with original Sparkfun files
Create test circuit demonstrating usage
Document any deviations

**License & Package Requirements**
Ensure project uses CC 4.0 compatible license
Publish package to tscircuit.com
Include package link in submission
Submit PR to [tscircuit/sparkfun-packages](https://github.com/tscircuit/sparkfun-packages)

**Submission & Review**
Submit PR to registry with:
Comparison screenshots
Usage examples
Link to published tscircuit package
CC 4.0 compatible license
Wait for maintainer review

## Checklist Template

```markdown
# Sparkfun Module Replication Checklist

Module: [MODULE_NAME]
Original: [SPARKFUN_LINK]

## Components

[ ] All components identified
[ ] Footprints verified
[ ] Values matched

## Board

[ ] Dimensions matched
[ ] Layer stackup correct
[ ] Silkscreen complete

## Documentation

[ ] Usage example created
[ ] All pins documented
[ ] Power requirements noted

## Verification

[ ] Gerber files generated
[ ] Comparison completed
[ ] Test circuit working
[ ] CC 4.0 compatible license added
[ ] Package published on tscircuit.com
[ ] PR submitted to tscircuit/sparkfun-packages
```

## Payment Process

- Once your issue is approved, an Algora bounty will be placed on the issue.
- The payment will be processed through the Algora platform
- Bonus may be available for exceptional quality implementations!

## Tips for Success

Use precision measuring tools
Document everything thoroughly
Test extensively
Communicate actively with maintainers
Follow tscircuit's code style guide

Join our [Discord](https://tscircuit.com/join) for help and to discuss your module replication project!
