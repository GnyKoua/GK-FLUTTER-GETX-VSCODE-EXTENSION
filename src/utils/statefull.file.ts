export const createStatefull = (name: string, type: string) =>
`import 'package:flutter/material.dart';

class ${name}${type} extends StatefulWidget {
    const ${name}${type}({super.key});

    @override
    State<${name}${type}> createState() => _${name}${type}State();
}

class _${name}${type}State extends State<${name}${type}> {
    @override
    Widget build(BuildContext context) {
        return Scaffold(
            appBar: AppBar(),
            body: Center(),
        );
    }
}
`;