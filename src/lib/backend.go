package backend

import (
	"fmt"
	"strconv"
)

type PointData struct {
	ControlValue   int      `json:"controlValue"`
	IterationValue int      `json:"iterationValue"`
	Points         []string `json:"points"`
}

type PointData_Numeric struct {
	ControlValue   int
	IterationValue int
	Points         []Point
}

func Reconvert_PointData(x PointData) PointData_Numeric {
	var temp_Numeric PointData_Numeric
	temp_Numeric.ControlValue = x.ControlValue
	temp_Numeric.IterationValue = x.IterationValue
	for i := 0; i < len(x.Points); i++ {
		if i%2 == 0 {
			var floated_val float64
			floated_val, _ = strconv.ParseFloat(x.Points[i], 64)
			var temp_point Point = Create_Point(floated_val, 0)
			temp_Numeric.Points = append(temp_Numeric.Points, temp_point)
		} else {
			var div_num int = i / 2
			temp_Numeric.Points[div_num].Y, _ = strconv.ParseFloat(x.Points[i], 64)
		}
	}
	return temp_Numeric
}

func midpoint(p1, p2 Point) Point {
	return Point{
		X: (p1.X + p2.X) / 2,
		Y: (p1.Y + p2.Y) / 2,
	}
}

func bruteforce_bezier(input PointData_Numeric) []Point {
	var temp []Point = input.Points
	var p0 Point = input.Points[0]
	var pt Point = input.Points[len(input.Points)-1]
	var result []Point
	var mid Point

	for i := 0; i < input.IterationValue; i++ {
		result = nil // kosongin result lagi
		result = append(result, p0)
		for j := 0; j < len(temp)-1; j++ {
			mid = midpoint(temp[j], temp[j+1])
			result = append(result, mid)
		}
		result = append(result, pt)
		temp = result // update temp
	}
	return result
}

func Back_Main() {
	var new_Point PointData_Numeric = PointData_Numeric{
		ControlValue:   3,
		IterationValue: 3,
		Points: []Point{
			{1.0, 2.0},
			{3.0, 4.0},
			{5.0, 6.0},
		},
	}
	fmt.Println("Control Value:", new_Point.ControlValue)
	fmt.Println("Iteration Value:", new_Point.IterationValue)
	fmt.Println("Points:", new_Point.Points)

	// brute force
	result := bruteforce_bezier(new_Point)
	fmt.Println("Result after Bézier iterations:", result)
}
