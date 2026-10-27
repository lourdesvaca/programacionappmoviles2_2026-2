import 'package:flutter/material.dart';


class AppColors {
  static const Color fondo = Color(0xFF0D0F14);
  static const Color superficie = Color(0xFF171A21);
  static const Color superficieAlta = Color(0xFF20242D);
  static const Color borde = Color(0xFF2A2F3A);
  static const Color primario = Color.fromARGB(255, 147, 154, 250);
  static const Color secundario = Color(0xFF3DD6C6);
  static const Color texto = Color(0xFFF2F3F5);
  static const Color textoSuave = Color(0xFF9AA0AC);
  static const Color peligro = Color(0xFFE5484D);


  static Color colorRating(double rating) {
    if (rating >= 7) return const Color(0xFF21D07A);
    if (rating >= 5) return const Color(0xFFD2D531);
    return const Color(0xFFDB2360);
  }
}

class AppTheme {
  static ThemeData get oscuro {
    final esquema =
        ColorScheme.fromSeed(
          seedColor: const Color.fromARGB(255, 147, 154, 250),
          brightness: Brightness.dark,
        ).copyWith(
          primary: const Color.fromARGB(255, 147, 154, 250),
          onPrimary: Colors.black,
          secondary: AppColors.secundario,
          surface: AppColors.superficie,
          onSurface: AppColors.texto,
        );

    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      colorScheme: esquema,
      scaffoldBackgroundColor: AppColors.fondo,
    );
  }
}
