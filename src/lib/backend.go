package backend

import (
	"fmt"
	"math"
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

var PointsGlobale []Point

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

func Find_Mid_Point(x Point, y Point) Point {
	var mid_point Point
	mid_point.X = (y.X + x.X) / 2
	mid_point.Y = (y.Y + x.Y) / 2
	return mid_point
}

func Construct_List_Mid_Point(x []Point) [][]Point {
	temp_point := make([][]Point, len(x)-1)
	for i := 0; i < len(x)-1; i++ {
		for j := 0; j < len(x)-i-1; j++ {
			if i == 0 {
				temp_point[i] = append(temp_point[i], Find_Mid_Point(x[j], x[j+1]))
			} else {
				temp_point[i] = append(temp_point[i], Find_Mid_Point(temp_point[i-1][j], temp_point[i-1][j+1]))
			}
		}
	}
	return temp_point
}

func findpoint(P []Point, t float64) []Point {
	var temp []Point = P
	numPoints := len(P)
	for numPoints > 1 {
		newP := make([]Point, numPoints-1)
		for i := 0; i < numPoints-1; i++ {
			newP[i].X = t*(temp[i+1].X-temp[i].X) + temp[i].X
			newP[i].Y = t*(temp[i+1].Y-temp[i].Y) + temp[i].Y
		}
		temp = newP
		numPoints--
	}
	return temp
}

func TraceCurve(input PointData_Numeric) []Point {
	var result []Point
	add := 0.5 * math.Pow(0.5, float64(input.IterationValue-1))
	t := 0.0

	for t <= 1 {
		fmt.Println(t)
		result = append(result, findpoint(input.Points, t)...)
		t = t + add
	}

	return result
}

func Bezier_Line(x PointData_Numeric, iteration_counter int) {
	if iteration_counter == x.IterationValue {
		var constructed_point [][]Point = Construct_List_Mid_Point(x.Points)
		PointsGlobale = append(PointsGlobale, x.Points[0])
		PointsGlobale = append(PointsGlobale, constructed_point[len(constructed_point)-1][0])
	} else {
		var constructed_point [][]Point = Construct_List_Mid_Point(x.Points)
		var point_1, point_2 []Point
		point_1 = append(point_1, x.Points[0])
		for i := 0; i < x.ControlValue; i++ {
			point_1 = append(point_1, constructed_point[i][0])
		}
		for i := 0; i < x.ControlValue; i++ {
			point_2 = append(point_2, constructed_point[x.ControlValue-1-i][i])
		}
		point_2 = append(point_2, x.Points[len(x.Points)-1])
		var x_1 PointData_Numeric
		var x_2 PointData_Numeric
		x_1.ControlValue = x.ControlValue
		x_2.ControlValue = x.ControlValue
		x_1.IterationValue, x_2.IterationValue = x.IterationValue, x.IterationValue
		x_1.Points = point_1
		x_2.Points = point_2
		Bezier_Line(x_1, iteration_counter+1)
		Bezier_Line(x_2, iteration_counter+1)
	}
}

func Back_Main(x PointData) []Point {
	var new_Point PointData_Numeric = Reconvert_PointData(x)
	var PointsGlobalNew []Point
	PointsGlobale = PointsGlobalNew
	Bezier_Line(new_Point, 1)
	PointsGlobale = append(PointsGlobale, new_Point.Points[x.ControlValue])
	// fmt.Println(new_Point.ControlValue)
	// fmt.Println(new_Point.IterationValue)
	// fmt.Println(new_Point.Points)
	fmt.Println(PointsGlobale)
	return PointsGlobale
}
