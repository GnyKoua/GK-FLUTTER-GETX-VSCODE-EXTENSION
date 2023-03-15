export const createStateless = (name: string, type: string) =>
`import 'package:flutter/material.dart';

class ${name}${type} extends StatelessWidget {
    const ${name}${type}({super.key});
  
    @override
    Widget build(BuildContext context) {
        return Scaffold(
            appBar: AppBar(),
            body: Center(),
        );
    }
}
`;