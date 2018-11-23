All the controllers/logic here


#### Guidelines

 - Filename should be in PascalCase and Filename and Classname should be same.

#### Boilerplate

```
'use strict';

import { Request, Response } from 'express';

class TestController {

  testFunction = (req: Request, res: Response) => {
    res.send(`some response`);
  }
}

export const testController = new TestController();
```
