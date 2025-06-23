import { Customer } from "@/model/Customer";
import { ServerDatabaseService } from "@/services/databaseService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const gender = searchParams.get("gender");

    const filters: Record<string, any> = {};
    if (gender !== null && gender !== "") {
      filters.gender = gender === "true";
    }

    let result;
    if (search.trim()) {
      result = await ServerDatabaseService.search<any>(
        "Customer",
        "name",
        search.trim(),
        {
          page,
          limit,
          orderBy: "created_at",
          ascending: false,
        }
      );
    } else {
      result = await ServerDatabaseService.getAll("Customer", {
        page,
        limit,
        orderBy: "created_at",
        ascending: false,
        filters: Object.keys(filters).length > 0 ? filters : undefined,
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, address, gender, email, notes, avatar } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Tên và số điện thoại là bắt buộc" },
        { status: 400 }
      );
    }

    const customerData: Partial<Customer> = {
      name: name.trim(),
      phone: phone.trim(),
      address: address?.trim(),
      gender: gender !== undefined ? gender : undefined,
      email: email?.trim(),
      notes: notes?.trim(),
      avatar: avatar?.trim(),
    };

    const result = await ServerDatabaseService.create("Customer", customerData);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const body = await request.json();
    const { name, phone, address, gender, email, notes, avatar } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Tên và số điện thoại là bắt buộc" },
        { status: 400 }
      );
    }

    const customerData: Partial<Customer> = {
      name: name.trim(),
      phone: phone.trim(),
      address: address?.trim(),
      gender: gender !== undefined ? gender : undefined,
      email: email?.trim(),
      notes: notes?.trim(),
      avatar: avatar?.trim(),
      updated_at: new Date().toISOString(),
    };

    const result = await ServerDatabaseService.update(
      "Customer",
      id,
      customerData
    );

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const result = await ServerDatabaseService.delete("Customer", id);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
