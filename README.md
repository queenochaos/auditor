# auditor

ID generator. Truncate the last 3 digits and supply the epoch used when creating ID to get creation time.

## Usage
```ts
import { create, createdAt } from "https://deno.land/x/id_gen@v1.0.0/mod.ts"

const ID = create() // 74707692598000 
createdAt(ID) // 2022-07-03T09:40:03.598Z

```
